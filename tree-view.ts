import {
	Component, 
	bootstrap,
	Input,
	CORE_DIRECTIVES,
	OnInit
} from 'angular2/angular2';

@Component({
	selector: 'node',
	directives: [CORE_DIRECTIVES, Node],
	template: `
<li>
	<a class ="iconButton" (click)="toggle()"> <i class="material-icons">add</i>{{item.label}},{{IsExpanded}}</a>
	<div *ng-if="IsExpanded">
  	<ul *ng-if="item.subs">
  		<template ng-for #subitem [ng-for-of]="item.subs">
  			<node [item]="subitem"></node>
  		</template>
  	</ul>
	</div>
</li>
`
})
class Node implements OnInit {
	@Input() item: any;
  IsExpanded: boolean = false;
	onInit() {
		console.log(this.item);
	}
	toggle() {
   this.IsExpanded = !this.IsExpanded;
   console.log(this.IsExpanded+" " + this.item.label);
   
  }
}

@Component({
	selector: 'tree',
	directives: [CORE_DIRECTIVES, Node],
	template: `
<ul>
	<template ng-for #item [ng-for-of]="data">
		<node [item]="item"></node>
	</template>
</ul>
`
})
class Tree {
	@Input() data: any[];
}

@Component({
	selector: 'ng-style-example',
	directives: [Tree],
	template: '<tree [data]="data"></tree>'
})
class MyApp {
	data = [
		{
			label: 'a1',
			subs: [
				{
					label: 'a11',
					subs: [
						{
							label: 'a111',
							subs: [
								{
									label: 'a1111',
									subs: [
										{
											label: 'a111112222'
										}
										]
								},
								{
									label: 'a1112'
								}
							]
						},
						{
							label: 'a112'
						}
					]
				},
				{
					label: 'a12',
				}
			]
		},
		{
			label: 'b1',
			subs: [
				{
					label: 'b11',
				},
				{
					label: 'b12',
				}
			]
		}
	]
}

bootstrap(MyApp);

// http://embed.plnkr.co/aMFtQw/
