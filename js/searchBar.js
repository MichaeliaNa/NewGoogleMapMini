class SearchBar{
	constructor(callback){
		this.templeate = `
		<div class="search-bar-wrapper">
			<input type="tetx" placeholder = "Input a type eg.restaurant" class="input-text-bar"/>
			<div class="search-icon"></div>
		</div> `;
		this.callback = callback;
	}
	addTo($parent){
		$parent.append(this.templeate);
		$('.search-bar-wrapper').on('keyup', _.bind(function(e){
			if(e.keyCode === 13){
				this.callback($('.input-text-bar')[0].value);
			}
		},this));
	}
}