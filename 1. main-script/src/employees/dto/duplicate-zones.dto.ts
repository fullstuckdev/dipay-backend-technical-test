import {
    IsArray,
    IsNotEmpty,
    ArrayMinSize
} from 'class-validator';


export class Duplicate {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly n: number[];
}
