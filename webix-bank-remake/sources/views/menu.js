import {JetView, plugins} from "webix-jet";

export default class MenuView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const theme = this.app.config.theme;
		const screen = this.app.config.size;

		return {
			view:"sidebar",
			css:theme,
			width:200,
			collapsed:(screen !== "wide"),
			data:[
				{ id:"transactions", value:_("Transactions"), icon:"mdi mdi-cart" },
				{ id:"customers", value:_("Clients"), icon:"mdi mdi-account-box" },
				{ id:"payhistoryview", value:_("Payment History"), icon:"mdi mdi-chart-areaspline" },
				
			]
		};
	}
	init(sidebar){
		this.use(plugins.Menu,{
			id:sidebar,
			urls:{
				"customers":"customers?user=1/information"
			}
		});
		this.on(this.app,"menu:toggle",() => sidebar.toggle());
		sidebar.getPopup().attachEvent("onBeforeShow",() => false);
	}
	urlChange(ui,url){
		if (!ui.find(opts => url[1].page === opts.id).length)
			ui.unselect();
	}
}
