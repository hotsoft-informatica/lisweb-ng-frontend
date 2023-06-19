// custom-autocomplete.component.ts
import { Component, Input, Output, EventEmitter, HostListener, HostBinding, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html',
  styleUrls: ['./custom-autocomplete.component.css'],
  standalone: true,
  imports: [MatAutocompleteModule, CommonModule]
})
export class CustomAutocompleteComponent implements OnInit {
  @Input() autocompleteLabel: string;
  @Input() autocompletePlaceholder: string;
  @Input() searchMethod: (text: string) => Observable<any>;
  @Output() selectedOptionIdChange = new EventEmitter<number>();

  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @ViewChild('datalist') datalist: ElementRef<HTMLDataListElement>;

  @HostBinding('attr.id') optionsListId = 'custom-autocomplete-options';
  @HostBinding('class.active') isActive = false;

  selectedOptionName: string = '';
  selectedOptionId: number;
  options: any[] = [];
  activeIndex: number = -1;

  ngOnInit() {
    // Optional: Load initial values for selectedOptionName and selectedOptionId
    this.searchOptions();
  }

  searchOptions() {
    this.searchMethod(this.selectedOptionName).subscribe(options => {
      this.options = options;
      this.updateSelectedOptionId();
    });
  }

  updateSelectedOptionId() {
    const selectedOption = this.options.find(option => option.name === this.selectedOptionName);
    this.selectedOptionId = selectedOption ? selectedOption.id : null;
    this.selectedOptionIdChange.emit(this.selectedOptionId);
    this.activeIndex = -1;
    this.input.nativeElement.focus();
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.activeIndex = (this.activeIndex - 1 + this.options.length) % this.options.length;
      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      this.activeIndex = (this.activeIndex + 1) % this.options.length;
      event.preventDefault();
    } else if (event.key === 'Enter') {
      const activeOption = this.datalist.nativeElement.options[this.activeIndex];
      if (activeOption) {
        this.selectedOptionName = activeOption.value;
        this.updateSelectedOptionId();
        event.preventDefault();
      }
    }
  }

  handleFocus() {
    this.isActive = true;
  }

  handleBlur() {
    this.isActive = false;
  }
}

