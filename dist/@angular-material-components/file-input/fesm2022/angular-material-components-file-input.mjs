import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Directive, viewChild, input, forwardRef, Input, Optional, Self, ViewEncapsulation, Component } from '@angular/core';
import * as i5 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/material/core';
import { _ErrorStateTracker } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import * as i1 from '@angular/cdk/platform';
import * as i2 from '@angular/forms';

let nextUniqueId = 0;
class NgxMatFileInputIcon {
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
class NgxMatFileInputComponent {
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

function calculFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    }
    else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    }
    else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}

/**
 * Validator for size of file
 * @param max Max of size of file (in bytes)
 */
function MaxSizeValidator(max) {
    return (ctrl) => {
        max = Number(max);
        if (isNaN(max)) {
            throw 'MaxSizeValidator: max of size of file is invalid';
        }
        if (!ctrl.value)
            return null;
        let files = ctrl.value;
        if (!Array.isArray(ctrl.value)) {
            files = [ctrl.value];
        }
        if (!files.length)
            return null;
        const add = (a, b) => a + b;
        const sumSize = files.map((x) => x.size).reduce(add);
        if (sumSize > max) {
            return {
                maxSize: true,
            };
        }
        return null;
    };
}

/**
 * Validator for input file accept
 * @param accept Allowable type of file
 */
function AcceptValidator(accept) {
    return (ctrl) => {
        if (!accept) {
            throw 'AcceptValidator: allowable type of file can not be empty';
        }
        if (ctrl.value == null)
            return null;
        if (!accept.includes(ctrl.value.type)) {
            return {
                accept: true,
            };
        }
        return null;
    };
}

/*
 * Public API Surface of file-input
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AcceptValidator, MaxSizeValidator, NgxMatFileInputComponent, NgxMatFileInputIcon, calculFileSize };
//# sourceMappingURL=angular-material-components-file-input.mjs.map
