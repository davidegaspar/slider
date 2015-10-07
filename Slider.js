/*
	Slide
*/
function Slide(r,o,w,d){//slider/root, options, willChange, didChange
	//vars
	var self=this;
	var curSlide=-1;
	var timer;
	var wait;
	this.state='ready';
	this.root=r;
	//slider (root)
	if(r===null)return null;
	//r.parentNode.classList.add('slide_static');
	r.classList.add('slide_static');
	//slides
	var slides=r.children;
	var t={d:'',f:''};
	for(var k=0;k<slides.length;k++){
    if(o.iFirst&&k===0){
  		//li.style.display='block';
  		curSlide=0;
  	}else{
  		//li.style.display='none';
  	}
  	if(typeof o.tIn=='string'){
  		if(o.iFirst&&k===0){
  			slides[k].classList.add('slide_static');
  		}else{
  			slides[k].classList.add(o.tIn);
  		}
  	}
  	// transition
  	if(typeof o.tDuration=='string'){
  		t.d=' '+o.tDuration;
  	}
  	if(typeof o.tFunction=='string'){
  		t.f=' '+o.tFunction;
  	}
  	slides[k].style.transition='transform'+t.d+t.f+',opacity'+t.d+t.f;
  	slides[k].style.webkitTransition='-webkit-transform'+t.d+t.f+',opacity'+t.d+t.f;
	}
	//options
	//typeof o.tCross=='number'&&o.tCross>=100?o.tCross-=100:o.tCross=0;
	o.tCross=typeof o.tCross=='number'&&o.tCross>=100?o.tCross-100:0;
	//methods
	this.play=function(){//start auto
		if(self.state!='auto'){
  		self.state='auto';
      timer=setInterval(self.next,o.sInterval);
      //console.log(self.name+' play'+curSlide);/*dbug*/
		}
	};
	this.stop=function(){//stops auto and resets
		self.state='ready';
		clearInterval(timer);
		//reset parameters !!!
		//console.log(self.name+' stop'+curSlide);/*dbug*/
	};
	this.pause=function(){//pause auto
		self.state='paused';
		clearInterval(timer);
		//console.log(self.name+' pause'+curSlide);/*dbug*/
	};
	this.wait=function(){//pause auto
		self.pause();
		clearTimeout(wait);
		wait=setTimeout(self.play,o.sInterval*2);
	};
	this.next=function(){//next slide
		typeof w=='function'&&w(curSlide);// jshint ignore:line
		//console.log(self.name+' w'+curSlide);/*dbug*/
		//hide current
		if(curSlide>=0&&curSlide<slides.length){
			slides[curSlide].classList.remove('slide_static');
			slides[curSlide].classList.add(o.tOut);
			setTimeout(function(){
				var adjust=0;
				if(curSlide===0)adjust=slides.length;
				//slides[curSlide-1+adjust].style.display='none';
				slides[curSlide-1+adjust].classList.remove(o.tOut);
				slides[curSlide-1+adjust].classList.add(o.tIn);
			},parseInt(o.tDuration+500));
		}
		//show next
		curSlide++;//console.log('inc '+curSlide);
		setTimeout(function(){
			if(curSlide>slides.length-1)curSlide=0;
			if(curSlide>=0&&curSlide<slides.length){
				//console.log('n '+curSlide);
				//slides[curSlide].style.display='block';
				setTimeout(function(){
					try {
						slides[curSlide].classList.remove(o.tIn);
					} catch (e) {
						//alert('slider');
					} finally {
						//console.log('s '+curSlide);
					}

					slides[curSlide].classList.add('slide_static');
					typeof d=='function'&&d(curSlide);// jshint ignore:line
					//console.log(self.name+' d'+curSlide);/*dbug*/
				},100);
			}
		},o.tCross);
	};
	this.prev=function(){//previous slide
		typeof w=='function'&&w(curSlide);// jshint ignore:line
		//console.log(self.name+' w'+curSlide);/*dbug*/
		//hide current
		if(curSlide>=0&&curSlide<slides.length){
			slides[curSlide].classList.remove('slide_static');
			slides[curSlide].classList.add(o.tOut);
			setTimeout(function(){
				var adjust=0;
				if(curSlide==slides.length-1)
					adjust=-slides.length;
				//slides[curSlide+1+adjust].style.display='none';
				slides[curSlide+1+adjust].classList.remove(o.tOut);
				slides[curSlide+1+adjust].classList.add(o.tIn);
			},parseInt(o.tDuration));
		}
		//show next
		curSlide--;
		setTimeout(function(){
			if(curSlide<0)curSlide=slides.length-1;
			if(curSlide>=0&&curSlide<slides.length){
				//console.log('p '+curSlide);
				//slides[curSlide].style.display='block';
				setTimeout(function(){
					slides[curSlide].classList.remove(o.tIn);
					slides[curSlide].classList.add('slide_static');
					typeof d=='function'&&d(curSlide);// jshint ignore:line
					//console.log(self.name+' d'+curSlide);/*dbug*/
				},100);
			}
		},o.tCross);
	};
	this.to=function(n){//to n slide
		self.pause();
		typeof w=='function'&&w(curSlide);// jshint ignore:line
		//console.log(self.name+' w'+curSlide);/*dbug*/
		//hide current
		if(curSlide>=0&&curSlide<slides.length){
			slides[curSlide].classList.remove('slide_static');
			slides[curSlide].classList.add(o.tOut);
			setTimeout(function(){
				var adjust=0;
				if(curSlide===0)adjust=slides.length;
				//slides[curSlide-1+adjust].style.display='none';
				slides[curSlide-1+adjust].classList.remove(o.tOut);
				slides[curSlide-1+adjust].classList.add(o.tIn);
			},parseInt(o.tDuration+100));
		}
		//show next
		curSlide=n;
		setTimeout(function(){
			if(curSlide>slides.length-1||curSlide<0)curSlide=0;
			if(curSlide>=0&&curSlide<slides.length){
				//console.log('n '+curSlide);
				//slides[curSlide].style.display='block';
				setTimeout(function(){
					slides[curSlide].classList.remove(o.tIn);
					slides[curSlide].classList.add('slide_static');
					typeof d=='function'&&d(curSlide);// jshint ignore:line
					//console.log(self.name+' d'+curSlide);/*dbug*/
				},100);
			}
		},o.tCross);
	};
}
