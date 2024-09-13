"use strict";
const TREE_WIDTH = 10;
const TREE_HEIGHT = 50;
const WAVE_SPEED = 0.01;
const LEAF_SIZE = 50;
var wood = document.createElement("img");
wood.src = "wood.jpg";
var leaf = document.createElement("img");
leaf.src = "leaf.png";

function Leaf(sz){
    this.size = sz;
}
function Tree(sz, depth)
{
	// these are it's properties
	this.size = sz;
    
	// this is its state
	this.depth = depth;
	this.child = [];
	this.childPhase = [];
	this.childUpdate = [];
	if (this.depth>1){
		var a = Math.floor(Math.random() * 2) + 2;
		for(var i = 1; i<=a; i++){
			var tree_new = new Tree(sz, this.depth-1);
			this.child.push(tree_new);
			this.childPhase.push(0);
			this.childUpdate.push(2*(a%2)-1);
		}
	} else {
		var end = new Leaf(1);
		this.child.push(end);
		this.childPhase.push(0);
		this.childUpdate.push(1);
	}
}

Leaf.prototype.draw = function(context) {
	context.save();
	context.scale(this.size, this.size);
	context.translate(-0.5*LEAF_SIZE,0);
	context.beginPath();
	context.drawImage(leaf, 0, 0, LEAF_SIZE, -1*LEAF_SIZE);
	context.fill();
	context.restore();
}

Tree.prototype.draw = function(context) {
	if (this.depth>=1){
		context.save();

		context.scale(this.size, this.size);

		context.beginPath();
		context.translate(-1*TREE_WIDTH,0);
		context.drawImage(wood, 0, 0, TREE_WIDTH, -1*TREE_HEIGHT);

		context.fill();

		context.translate(TREE_WIDTH, -1*TREE_HEIGHT);
		context.rotate(Math.PI/2);
		for(var i = 0; i<this.child.length; i++) {
			context.rotate(-1*Math.PI/(this.child.length+ 1)+(3*this.childPhase[i]*Math.PI/180));
			context.save();
			this.child[i].draw(context);
			context.restore();
		}

		context.restore();
	}
	else {
		this.child[0].draw(context);
	}
}

Tree.prototype.update = function() {
	for (var i = 0; i<this.child.length; i++) {
		this.childPhase[i] += WAVE_SPEED * this.childUpdate[i];
		if (this.childPhase[i] >=1){
			this.childPhase[i] = 2 - this.childPhase[i];
			this.childUpdate[i] = -1 * this.childUpdate[i];
		} else if (this.childPhase[i] <= -1){
			this.childPhase[i] = -2 - this.childPhase[i];
			this.childUpdate[i] = -1 * this.childUpdate[i];
		}
		this.child[i].update()
	}
}

Leaf.prototype.update = function() {

}
