import { Pipe, PipeTransform } from '@angular/core';
import {
  FillInBlankItem,
  FillInBlankItemNode,
} from '../models/fill-in-blanks.model';

@Pipe({
  name: 'filterNodes',
  standalone: true,
})
export class FilterNodesPipe implements PipeTransform {
  transform(nodes: FillInBlankItemNode[], filterBy: string): FillInBlankItem[] {
    const children = nodes.find((node) =>
      node.filter.$in.includes(filterBy),
    )?.children;
    return children ?? [];
  }
}
