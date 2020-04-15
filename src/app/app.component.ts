import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { combineLatest } from 'rxjs';
import { map,mergeMap,tap, flatMap, concatMap } from 'rxjs/operators';

export interface Title {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Author {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface StoryText {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface Url {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface CommentText {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface StoryTitle {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface StoryUrl {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface HighlightResult {
  title: Title;
  author: Author;
  story_text: StoryText;
  url: Url;
  comment_text: CommentText;
  story_title: StoryTitle;
  story_url: StoryUrl;
}

export interface Hit {
  created_at: Date;
  title: string;
  url: string;
  author: string;
  points?: number;
  story_text: string;
  comment_text: string;
  num_comments?: number;
  story_id?: number;
  story_title: string;
  story_url: string;
  parent_id?: number;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
  relevancy_score?: number;
}

export interface Search {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'haloDoc';
  searchTerm:string;
  searchResult:Search;
  finalResult:any=[];
  count:any=0;
  constructor(private searchService:SearchService){

  }
  search(page=0){
    const arr=[];
    console.log(page)
    this.searchService.search(this.searchTerm,page)
    .subscribe(result=>{
      this.searchResult=result;
      this.count=this.searchResult.hits.length;
      this.searchResult.hits.map(author=>{

        arr.push(this.searchService.getCount(author.author))
        })
        combineLatest(arr).subscribe(result=>{
          console.log(result)
          this.finalResult=result;
        })
      })
  }

  // search(page=0){
  //   console.log(page)
  //   this.searchService.search(this.searchTerm,page)
  //   .subscribe(result=>{
  //     this.searchResult=result;
  //     this.count=this.searchResult.hits.length;
  //     this.searchResult.hits.map(author=>{
  //       this.searchService.getCount(author.author).subscribe(count=>{
  //         console.log(count)
  //       })
  //       })
  //     })
  // }


  prev(){
    if(this.searchResult.page===0){
      return null;
    }
    else{
      this.search(this.searchResult.page-1)
    }
  }

  next(){
    if(this.searchResult.nbPages===this.searchResult.page){
      return null;
    }
    else{
      this.search(this.searchResult.page+1)
    }
  }

}
