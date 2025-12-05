import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Directive, forwardRef, Input, input, Optional, Self, viewChild, ViewEncapsulation, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { _ErrorStateTracker, } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/material/core";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/button";
let nextUniqueId = 0;
export class NgxMatFileInputIcon {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.5", ngImport: i0, type: NgxMatFileInputIcon, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.5", type: NgxMatFileInputIcon, isStandalone: true, selector: "[ngxMatFileInputIcon]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.5", ngImport: i0, type: NgxMatFileInputIcon, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngxMatFileInputIcon]',
                    standalone: true,
                }]
        }] });
// CanUpdateErrorState,
export class NgxMatFileInputComponent {
    get disabled() {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value || this._uid;
    }
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    // @Input() errorStateMatcher: ErrorStateMatcher;
    get errorStateMatcher() {
        return this._errorStateTracker.matcher;
    }
    set errorStateMatcher(value) {
        this._errorStateTracker.matcher = value;
    }
    get errorState() {
        return this._errorStateTracker.errorState;
    }
    set errorState(value) {
        this._errorStateTracker.errorState = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(value) {
        this._readonly = coerceBooleanProperty(value);
    }
    /**
     * Limiting accepted file types
     * Example: accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — Accept PNG or JPEG files.
     */
    get accept() {
        return this._accept;
    }
    set accept(value) {
        this._accept = value;
    }
    constructor(_elementRef, _platform, _cd, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._cd = _cd;
        this.ngControl = ngControl;
        this._inputFileRef = viewChild('inputFile');
        this._inputValueRef = viewChild('inputValue');
        this.color = input('primary');
        this.fileNames = null;
        this._uid = `ngx-mat-fileinput-${nextUniqueId++}`;
        this.stateChanges = new Subject();
        this.focused = false;
        //   errorState: boolean;
        this.controlType = 'ngx-mat-file-input';
        this.autofilled = false;
        /** Function when touched */
        this._onTouched = () => { };
        /** Function when changed */
        this._onChange = () => { };
        this._disabled = false;
        this._multiple = false;
        this.placeholder = 'Choose a file';
        this.separator = input(',');
        this._required = false;
        this._readonly = true;
        this.id = this.id;
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        this._errorStateTracker = new _ErrorStateTracker(_defaultErrorStateMatcher, ngControl, _parentFormGroup, _parentForm, this.stateChanges);
    }
    updateErrorState() {
        this._errorStateTracker.updateErrorState();
    }
    ngOnChanges() {
        this.stateChanges.next();
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
    ngDoCheck() {
        if (this.ngControl) {
            this.updateErrorState();
        }
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this._updateInputValue(value);
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this._onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    }
    /** Focuses the input. */
    focus(options) {
        this._inputValueRef().nativeElement.focus(options);
    }
    _focusChanged(isFocused) {
        if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
            this.focused = isFocused;
            this.stateChanges.next();
        }
    }
    /** Mark the field as touched */
    _markAsTouched() {
        this._onTouched();
        this._cd.markForCheck();
        this.stateChanges.next();
    }
    _isBadInput() {
        let validity = this._inputValueRef().nativeElement.validity;
        return validity && validity.badInput;
    }
    get empty() {
        return !this._inputValueRef().nativeElement.value && !this._isBadInput() && !this.autofilled;
    }
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }
    setDescribedByIds(ids) {
        this._ariaDescribedby = ids.join(' ');
    }
    openFilePicker(event) {
        this._inputFileRef().nativeElement.click();
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this._markAsTouched();
    }
    handleFiles(filelist) {
        if (filelist.length > 0) {
            const files = new Array();
            for (let i = 0; i < filelist.length; i++) {
                files.push(filelist.item(i));
            }
            this._updateInputValue(files);
            this._resetInputFile();
            this._onChange(this.multiple ? files : files[0]);
        }
    }
    /** Handles a click on the control's container. */
    onContainerClick(event) { }
    _resetInputFile() {
        this._inputFileRef().nativeElement.value = '';
    }
    _updateInputValue(files) {
        let text = null;
        if (files) {
            if (Array.isArray(files)) {
                text = this._multiple ? files.map((x) => x.name).join(this.separator()) : files[0].name;
            }
            else {
                text = files.name != null ? files.name : null;
            }
        }
        this._inputValueRef().nativeElement.value = text;
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.5", ngImport: i0, type: NgxMatFileInputComponent, deps: [{ token: i0.ElementRef }, { token: i1.Platform }, { token: i0.ChangeDetectorRef }, { token: i2.NgControl, optional: true, self: true }, { token: i2.NgForm, optional: true }, { token: i2.FormGroupDirective, optional: true }, { token: i3.ErrorStateMatcher }], target: i0.ɵɵFactoryTarget.Component }); }
    /** @nocollapse */ static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "18.1.5", type: NgxMatFileInputComponent, isStandalone: true, selector: "ngx-mat-file-input", inputs: { color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: false, isRequired: false, transformFunction: null }, id: { classPropertyName: "id", publicName: "id", isSignal: false, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: false, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: false, isRequired: false, transformFunction: null }, separator: { classPropertyName: "separator", publicName: "separator", isSignal: true, isRequired: false, transformFunction: null }, required: { classPropertyName: "required", publicName: "required", isSignal: false, isRequired: false, transformFunction: null }, errorStateMatcher: { classPropertyName: "errorStateMatcher", publicName: "errorStateMatcher", isSignal: false, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: false, isRequired: false, transformFunction: null }, readonly: { classPropertyName: "readonly", publicName: "readonly", isSignal: false, isRequired: false, transformFunction: null }, accept: { classPropertyName: "accept", publicName: "accept", isSignal: false, isRequired: false, transformFunction: null } }, host: { classAttribute: "ngx-mat-file-input" }, providers: [
            {
                provide: MatFormFieldControl,
                useExisting: forwardRef((() => NgxMatFileInputComponent)),
            },
        ], viewQueries: [{ propertyName: "_inputFileRef", first: true, predicate: ["inputFile"], descendants: true, isSignal: true }, { propertyName: "_inputValueRef", first: true, predicate: ["inputValue"], descendants: true, isSignal: true }], exportAs: ["ngx-mat-file-input"], usesOnChanges: true, ngImport: i0, template: "<input\n  #inputValue\n  autocomplete=\"off\"\n  class=\"mat-mdc-input-element mat-mdc-form-field-input-control mdc-text-field__input\"\n  [attr.id]=\"id\"\n  [attr.placeholder]=\"placeholder\"\n  [disabled]=\"disabled\"\n  [required]=\"required\"\n  [attr.readonly]=\"readonly || null\"\n  [attr.aria-describedby]=\"_ariaDescribedby || null\"\n  [attr.aria-invalid]=\"errorState\"\n  [attr.aria-required]=\"required.toString()\"\n/>\n<div class=\"mat-mdc-form-field-suffix\">\n  <button\n    matSuffix\n    mat-icon-button\n    [color]=\"color()\"\n    class=\"button-browse\"\n    (click)=\"openFilePicker($event)\"\n    type=\"button\"\n    [disabled]=\"disabled\"\n  >\n    <ng-content select=\"[ngxMatFileInputIcon]\">\n      <mat-icon class=\"ngx-mat-file-input--default-icon\">attach_file</mat-icon>\n    </ng-content>\n  </button>\n</div>\n<input\n  type=\"file\"\n  #inputFile\n  (change)=\"handleFiles($event.target.files)\"\n  class=\"input-file\"\n  [multiple]=\"multiple\"\n  [accept]=\"accept\"\n/>\n", styles: [".mat-mdc-form-field-appearance-outline .mat-form-field-prefix .ngx-mat-file-input--default-icon,.mat-mdc-form-field-appearance-outline .mat-form-field-suffix .ngx-mat-file-input--default-icon{width:1em}.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-prefix .ngx-mat-file-input--default-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-suffix .ngx-mat-file-input--default-icon{display:block;width:1.5em;height:1.5em}.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-prefix .mat-icon-button .ngx-mat-file-input--default-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-suffix .mat-icon-button .ngx-mat-file-input--default-icon{margin:auto}.ngx-mat-file-input{display:flex;line-height:18px;align-items:center}.ngx-mat-file-input .input-file{display:block;visibility:hidden;width:0;height:0}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i5.MatIconButton, selector: "button[mat-icon-button]", exportAs: ["matButton"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.5", ngImport: i0, type: NgxMatFileInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-mat-file-input', encapsulation: ViewEncapsulation.None, host: {
                        class: 'ngx-mat-file-input',
                    }, providers: [
                        {
                            provide: MatFormFieldControl,
                            useExisting: forwardRef((() => NgxMatFileInputComponent)),
                        },
                    ], exportAs: 'ngx-mat-file-input', standalone: true, imports: [MatIconModule, MatButtonModule], template: "<input\n  #inputValue\n  autocomplete=\"off\"\n  class=\"mat-mdc-input-element mat-mdc-form-field-input-control mdc-text-field__input\"\n  [attr.id]=\"id\"\n  [attr.placeholder]=\"placeholder\"\n  [disabled]=\"disabled\"\n  [required]=\"required\"\n  [attr.readonly]=\"readonly || null\"\n  [attr.aria-describedby]=\"_ariaDescribedby || null\"\n  [attr.aria-invalid]=\"errorState\"\n  [attr.aria-required]=\"required.toString()\"\n/>\n<div class=\"mat-mdc-form-field-suffix\">\n  <button\n    matSuffix\n    mat-icon-button\n    [color]=\"color()\"\n    class=\"button-browse\"\n    (click)=\"openFilePicker($event)\"\n    type=\"button\"\n    [disabled]=\"disabled\"\n  >\n    <ng-content select=\"[ngxMatFileInputIcon]\">\n      <mat-icon class=\"ngx-mat-file-input--default-icon\">attach_file</mat-icon>\n    </ng-content>\n  </button>\n</div>\n<input\n  type=\"file\"\n  #inputFile\n  (change)=\"handleFiles($event.target.files)\"\n  class=\"input-file\"\n  [multiple]=\"multiple\"\n  [accept]=\"accept\"\n/>\n", styles: [".mat-mdc-form-field-appearance-outline .mat-form-field-prefix .ngx-mat-file-input--default-icon,.mat-mdc-form-field-appearance-outline .mat-form-field-suffix .ngx-mat-file-input--default-icon{width:1em}.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-prefix .ngx-mat-file-input--default-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-suffix .ngx-mat-file-input--default-icon{display:block;width:1.5em;height:1.5em}.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-prefix .mat-icon-button .ngx-mat-file-input--default-icon,.mat-mdc-form-field:not(.mat-form-field-appearance-outline) .mat-form-field-suffix .mat-icon-button .ngx-mat-file-input--default-icon{margin:auto}.ngx-mat-file-input{display:flex;line-height:18px;align-items:center}.ngx-mat-file-input .input-file{display:block;visibility:hidden;width:0;height:0}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.Platform }, { type: i0.ChangeDetectorRef }, { type: i2.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i2.NgForm, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }, { type: i3.ErrorStateMatcher }], propDecorators: { disabled: [{
                type: Input
            }], id: [{
                type: Input
            }], multiple: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], required: [{
                type: Input
            }], errorStateMatcher: [{
                type: Input
            }], value: [{
                type: Input
            }], readonly: [{
                type: Input
            }], accept: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9maWxlLWlucHV0L3NyYy9saWIvZmlsZS1pbnB1dC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9maWxlLWlucHV0L3NyYy9saWIvZmlsZS1pbnB1dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUc5RCxPQUFPLEVBRUwsU0FBUyxFQUNULFNBQVMsRUFHVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLEtBQUssRUFFTCxRQUFRLEVBQ1IsSUFBSSxFQUNKLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFFTCxrQkFBa0IsR0FHbkIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQUcvQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFNckIsTUFBTSxPQUFPLG1CQUFtQjtpSUFBbkIsbUJBQW1CO3FIQUFuQixtQkFBbUI7OzJGQUFuQixtQkFBbUI7a0JBSi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsVUFBVSxFQUFFLElBQUk7aUJBQ2pCOztBQXFCRCx1QkFBdUI7QUFDdkIsTUFBTSxPQUFPLHdCQUF3QjtJQTRCbkMsSUFDSSxRQUFRO1FBQ1YsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMs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QUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDaEQsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDbkQsQ0FBQztpSUFwUVUsd0JBQXdCO3FIQUF4Qix3QkFBd0IsOGdEQVh4QjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxtQkFBbUI7Z0JBQzVCLFdBQVcsRUFBRSxVQUFVLEVBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLEVBQUM7YUFDeEQ7U0FDRiw0VENwREgsdy9CQW9DQSxvOEJEbUJZLGFBQWEsbUxBQUUsZUFBZTs7MkZBRzdCLHdCQUF3QjtrQkFuQnBDLFNBQVM7K0JBQ0Usb0JBQW9CLGlCQUdmLGlCQUFpQixDQUFDLElBQUksUUFDL0I7d0JBQ0osS0FBSyxFQUFFLG9CQUFvQjtxQkFDNUIsYUFDVTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsbUJBQW1COzRCQUM1QixXQUFXLEVBQUUsVUFBVSxFQUFDLEdBQUcsRUFBRSx5QkFBeUIsRUFBQzt5QkFDeEQ7cUJBQ0YsWUFDUyxvQkFBb0IsY0FDbEIsSUFBSSxXQUNQLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQzs7MEJBaUl0QyxRQUFROzswQkFBSSxJQUFJOzswQkFDaEIsUUFBUTs7MEJBQ1IsUUFBUTt5RUFuR1AsUUFBUTtzQkFEWCxLQUFLO2dCQWlCRixFQUFFO3NCQURMLEtBQUs7Z0JBVUYsUUFBUTtzQkFEWCxLQUFLO2dCQVVOLFdBQVc7c0JBRFYsS0FBSztnQkFLRixRQUFRO3NCQURYLEtBQUs7Z0JBV0YsaUJBQWlCO3NCQURwQixLQUFLO2dCQWdCRixLQUFLO3NCQURSLEtBQUs7Z0JBVUYsUUFBUTtzQkFEWCxLQUFLO2dCQWNGLE1BQU07c0JBRFQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIGlucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBTZWxmLFxuICB2aWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtR3JvdXBEaXJlY3RpdmUsIE5nQ29udHJvbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7XG4gIF9BYnN0cmFjdENvbnN0cnVjdG9yLFxuICBfRXJyb3JTdGF0ZVRyYWNrZXIsXG4gIEVycm9yU3RhdGVNYXRjaGVyLFxuICBUaGVtZVBhbGV0dGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlsZU9yQXJyYXlGaWxlIH0gZnJvbSAnLi9maWxlLWlucHV0LXR5cGUnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25neE1hdEZpbGVJbnB1dEljb25dJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0RmlsZUlucHV0SWNvbiB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtbWF0LWZpbGUtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJ2ZpbGUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZmlsZS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICduZ3gtbWF0LWZpbGUtaW5wdXQnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBNYXRGb3JtRmllbGRDb250cm9sLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4TWF0RmlsZUlucHV0Q29tcG9uZW50KSxcbiAgICB9LFxuICBdLFxuICBleHBvcnRBczogJ25neC1tYXQtZmlsZS1pbnB1dCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtNYXRJY29uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGVdLFxufSlcbi8vIENhblVwZGF0ZUVycm9yU3RhdGUsXG5leHBvcnQgY2xhc3MgTmd4TWF0RmlsZUlucHV0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgTWF0Rm9ybUZpZWxkQ29udHJvbDxGaWxlT3JBcnJheUZpbGU+LCBPbkRlc3Ryb3ksIERvQ2hlY2ssIENvbnRyb2xWYWx1ZUFjY2Vzc29yXG57XG4gIHByaXZhdGUgX2lucHV0RmlsZVJlZiA9IHZpZXdDaGlsZDxFbGVtZW50UmVmPignaW5wdXRGaWxlJyk7XG4gIHByaXZhdGUgX2lucHV0VmFsdWVSZWYgPSB2aWV3Q2hpbGQ8RWxlbWVudFJlZj4oJ2lucHV0VmFsdWUnKTtcblxuICBwcml2YXRlIF9lcnJvclN0YXRlVHJhY2tlcjogX0Vycm9yU3RhdGVUcmFja2VyO1xuXG4gIHJlYWRvbmx5IGNvbG9yID0gaW5wdXQ8VGhlbWVQYWxldHRlPigncHJpbWFyeScpO1xuXG4gIHB1YmxpYyBmaWxlTmFtZXM6IHN0cmluZyA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIF91aWQgPSBgbmd4LW1hdC1maWxlaW5wdXQtJHtuZXh0VW5pcXVlSWQrK31gO1xuICBwcm90ZWN0ZWQgX3ByZXZpb3VzTmF0aXZlVmFsdWU6IGFueTtcbiAgX2FyaWFEZXNjcmliZWRieTogc3RyaW5nO1xuXG4gIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLy8gICBlcnJvclN0YXRlOiBib29sZWFuO1xuICBjb250cm9sVHlwZTogc3RyaW5nID0gJ25neC1tYXQtZmlsZS1pbnB1dCc7XG4gIGF1dG9maWxsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogRnVuY3Rpb24gd2hlbiB0b3VjaGVkICovXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICAvKiogRnVuY3Rpb24gd2hlbiBjaGFuZ2VkICovXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBGaWxlT3JBcnJheUZpbGUpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubmdDb250cm9sICYmIHRoaXMubmdDb250cm9sLmRpc2FibGVkICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZ0NvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuZm9jdXNlZCkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pZCA9IHZhbHVlIHx8IHRoaXMuX3VpZDtcbiAgfVxuICBwcm90ZWN0ZWQgX2lkOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9tdWx0aXBsZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHBsYWNlaG9sZGVyID0gJ0Nob29zZSBhIGZpbGUnO1xuICBzZXBhcmF0b3IgPSBpbnB1dDxzdHJpbmc+KCcsJyk7XG5cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZDtcbiAgfVxuICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9yZXF1aXJlZCA9IGZhbHNlO1xuXG4gIC8vIEBJbnB1dCgpIGVycm9yU3RhdGVNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcbiAgQElucHV0KClcbiAgZ2V0IGVycm9yU3RhdGVNYXRjaGVyKCkge1xuICAgIHJldHVybiB0aGlzLl9lcnJvclN0YXRlVHJhY2tlci5tYXRjaGVyO1xuICB9XG4gIHNldCBlcnJvclN0YXRlTWF0Y2hlcih2YWx1ZTogRXJyb3JTdGF0ZU1hdGNoZXIpIHtcbiAgICB0aGlzLl9lcnJvclN0YXRlVHJhY2tlci5tYXRjaGVyID0gdmFsdWU7XG4gIH1cblxuICBnZXQgZXJyb3JTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JTdGF0ZVRyYWNrZXIuZXJyb3JTdGF0ZTtcbiAgfVxuICBzZXQgZXJyb3JTdGF0ZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Vycm9yU3RhdGVUcmFja2VyLmVycm9yU3RhdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBGaWxlT3JBcnJheUZpbGUge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IEZpbGVPckFycmF5RmlsZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cbiAgcHJvdGVjdGVkIF92YWx1ZTogRmlsZU9yQXJyYXlGaWxlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gIH1cbiAgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gdHJ1ZTtcblxuICAvKipcbiAgICogTGltaXRpbmcgYWNjZXB0ZWQgZmlsZSB0eXBlc1xuICAgKiBFeGFtcGxlOiBhY2NlcHQ9XCJpbWFnZS9wbmcsIGltYWdlL2pwZWdcIiBvciBhY2NlcHQ9XCIucG5nLCAuanBnLCAuanBlZ1wiIOKAlCBBY2NlcHQgUE5HIG9yIEpQRUcgZmlsZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgYWNjZXB0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2FjY2VwdDtcbiAgfVxuICBzZXQgYWNjZXB0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hY2NlcHQgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9hY2NlcHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgIEBPcHRpb25hbCgpIF9wYXJlbnRGb3JtOiBOZ0Zvcm0sXG4gICAgQE9wdGlvbmFsKCkgX3BhcmVudEZvcm1Hcm91cDogRm9ybUdyb3VwRGlyZWN0aXZlLFxuICAgIF9kZWZhdWx0RXJyb3JTdGF0ZU1hdGNoZXI6IEVycm9yU3RhdGVNYXRjaGVyLFxuICApIHtcbiAgICB0aGlzLmlkID0gdGhpcy5pZDtcblxuICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fZXJyb3JTdGF0ZVRyYWNrZXIgPSBuZXcgX0Vycm9yU3RhdGVUcmFja2VyKFxuICAgICAgX2RlZmF1bHRFcnJvclN0YXRlTWF0Y2hlcixcbiAgICAgIG5nQ29udHJvbCxcbiAgICAgIF9wYXJlbnRGb3JtR3JvdXAsXG4gICAgICBfcGFyZW50Rm9ybSxcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLFxuICAgICk7XG4gIH1cblxuICB1cGRhdGVFcnJvclN0YXRlKCkge1xuICAgIHRoaXMuX2Vycm9yU3RhdGVUcmFja2VyLnVwZGF0ZUVycm9yU3RhdGUoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMubmdDb250cm9sKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVycm9yU3RhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICB3cml0ZVZhbHVlKHZhbHVlOiBGaWxlT3JBcnJheUZpbGUpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVJbnB1dFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICAvKiogRm9jdXNlcyB0aGUgaW5wdXQuICovXG4gIGZvY3VzKG9wdGlvbnM/OiBGb2N1c09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnB1dFZhbHVlUmVmKCkubmF0aXZlRWxlbWVudC5mb2N1cyhvcHRpb25zKTtcbiAgfVxuXG4gIF9mb2N1c0NoYW5nZWQoaXNGb2N1c2VkOiBib29sZWFuKSB7XG4gICAgaWYgKGlzRm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkICYmICghdGhpcy5yZWFkb25seSB8fCAhaXNGb2N1c2VkKSkge1xuICAgICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNYXJrIHRoZSBmaWVsZCBhcyB0b3VjaGVkICovXG4gIF9tYXJrQXNUb3VjaGVkKCkge1xuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaXNCYWRJbnB1dCgpIHtcbiAgICBsZXQgdmFsaWRpdHkgPSAodGhpcy5faW5wdXRWYWx1ZVJlZigpLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsaWRpdHk7XG4gICAgcmV0dXJuIHZhbGlkaXR5ICYmIHZhbGlkaXR5LmJhZElucHV0O1xuICB9XG5cbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5faW5wdXRWYWx1ZVJlZigpLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgIXRoaXMuX2lzQmFkSW5wdXQoKSAmJiAhdGhpcy5hdXRvZmlsbGVkO1xuICB9XG5cbiAgZ2V0IHNob3VsZExhYmVsRmxvYXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9jdXNlZCB8fCAhdGhpcy5lbXB0eTtcbiAgfVxuXG4gIHNldERlc2NyaWJlZEJ5SWRzKGlkczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVkYnkgPSBpZHMuam9pbignICcpO1xuICB9XG5cbiAgb3BlbkZpbGVQaWNrZXIoZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5faW5wdXRGaWxlUmVmKCkubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLl9tYXJrQXNUb3VjaGVkKCk7XG4gIH1cblxuICBoYW5kbGVGaWxlcyhmaWxlbGlzdDogRmlsZUxpc3QpIHtcbiAgICBpZiAoZmlsZWxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlsZXM6IEFycmF5PEZpbGU+ID0gbmV3IEFycmF5KCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZpbGVzLnB1c2goZmlsZWxpc3QuaXRlbShpKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVJbnB1dFZhbHVlKGZpbGVzKTtcbiAgICAgIHRoaXMuX3Jlc2V0SW5wdXRGaWxlKCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLm11bHRpcGxlID8gZmlsZXMgOiBmaWxlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXMgYSBjbGljayBvbiB0aGUgY29udHJvbCdzIGNvbnRhaW5lci4gKi9cbiAgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCkge31cblxuICBwcml2YXRlIF9yZXNldElucHV0RmlsZSgpIHtcbiAgICB0aGlzLl9pbnB1dEZpbGVSZWYoKS5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVJbnB1dFZhbHVlKGZpbGVzOiBGaWxlT3JBcnJheUZpbGUpIHtcbiAgICBsZXQgdGV4dCA9IG51bGw7XG4gICAgaWYgKGZpbGVzKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlcykpIHtcbiAgICAgICAgdGV4dCA9IHRoaXMuX211bHRpcGxlID8gZmlsZXMubWFwKCh4KSA9PiB4Lm5hbWUpLmpvaW4odGhpcy5zZXBhcmF0b3IoKSkgOiBmaWxlc1swXS5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dCA9IGZpbGVzLm5hbWUgIT0gbnVsbCA/IGZpbGVzLm5hbWUgOiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2lucHV0VmFsdWVSZWYoKS5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGV4dDtcbiAgfVxufVxuIiwiPGlucHV0XG4gICNpbnB1dFZhbHVlXG4gIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gIGNsYXNzPVwibWF0LW1kYy1pbnB1dC1lbGVtZW50IG1hdC1tZGMtZm9ybS1maWVsZC1pbnB1dC1jb250cm9sIG1kYy10ZXh0LWZpZWxkX19pbnB1dFwiXG4gIFthdHRyLmlkXT1cImlkXCJcbiAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICBbcmVxdWlyZWRdPVwicmVxdWlyZWRcIlxuICBbYXR0ci5yZWFkb25seV09XCJyZWFkb25seSB8fCBudWxsXCJcbiAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJfYXJpYURlc2NyaWJlZGJ5IHx8IG51bGxcIlxuICBbYXR0ci5hcmlhLWludmFsaWRdPVwiZXJyb3JTdGF0ZVwiXG4gIFthdHRyLmFyaWEtcmVxdWlyZWRdPVwicmVxdWlyZWQudG9TdHJpbmcoKVwiXG4vPlxuPGRpdiBjbGFzcz1cIm1hdC1tZGMtZm9ybS1maWVsZC1zdWZmaXhcIj5cbiAgPGJ1dHRvblxuICAgIG1hdFN1ZmZpeFxuICAgIG1hdC1pY29uLWJ1dHRvblxuICAgIFtjb2xvcl09XCJjb2xvcigpXCJcbiAgICBjbGFzcz1cImJ1dHRvbi1icm93c2VcIlxuICAgIChjbGljayk9XCJvcGVuRmlsZVBpY2tlcigkZXZlbnQpXCJcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICA+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW25neE1hdEZpbGVJbnB1dEljb25dXCI+XG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJuZ3gtbWF0LWZpbGUtaW5wdXQtLWRlZmF1bHQtaWNvblwiPmF0dGFjaF9maWxlPC9tYXQtaWNvbj5cbiAgICA8L25nLWNvbnRlbnQ+XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG48aW5wdXRcbiAgdHlwZT1cImZpbGVcIlxuICAjaW5wdXRGaWxlXG4gIChjaGFuZ2UpPVwiaGFuZGxlRmlsZXMoJGV2ZW50LnRhcmdldC5maWxlcylcIlxuICBjbGFzcz1cImlucHV0LWZpbGVcIlxuICBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIlxuICBbYWNjZXB0XT1cImFjY2VwdFwiXG4vPlxuIl19