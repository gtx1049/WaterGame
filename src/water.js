var WaterLayer = cc.Layer.extend({
	space : null,
	ringsprite : null,
	
	ctor:function(space){
		this._super();
		
		this.space = space;
		
		this.init();

		return true;
	},
	
	init:function(){
		this._super();
		
		var size = cc.winSize;

		var helloLabel = new cc.LabelTTF("Hello World", "", 38);
		helloLabel.x = size.width / 2;
		helloLabel.y = size.height / 2;

		this.addChild(helloLabel);
		
		this.ringsprite = new cc.PhysicsSprite("res/CloseSelected.png");
		
		var contentSize = this.ringsprite.getContentSize();
		// 2. init the runner physic body
		this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		//3. set the position of the runner
		this.body.p = cc.p(g_runnerStartX, g_groundHeight + 100);
		//4. apply impulse to the body
		this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
		//5. add the created body to space
		this.space.addBody(this.body);
		//6. create the shape for the body
		this.shape = new cp.BoxShape(this.body, contentSize.width, contentSize.height);
		//7. add shape to space
		this.space.addShape(this.shape);
		//8. set body to the physic sprite
		this.ringsprite.setBody(this.body);
	
		
		this.addChild(this.ringsprite);
	}
});

var WaterScene = cc.Scene.extend({
	
	space : null,
	
	onEnter:function () {
		this._super();

	},
	
	onEnter:function(){
		this._super();
		this.initPhysics();
		
		var layer = new WaterLayer(this.space);
		this.addChild(layer);
		
		this.scheduleUpdate();
	},
	
	initPhysics:function(){
		//1. new space object 
		this.space = new cp.Space();
		//2. setup the  Gravity
		this.space.gravity = cp.v(0, -350);

		// 3. set up Walls
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHeight),// start point
				cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
	},
	
	update:function (dt) {
		// chipmunk step
		this.space.step(dt);
	}
});