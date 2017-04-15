_print: function () {
    console.log("=======>print");

    var a = this.grid.getSelectedRowData();
    console.log(a);

    var element = this.$("#lodop-info")[0];
    var LODOP = getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'),element);

    var top = 10;
    var left = 10;
    var width = 320;
    var height = 20;
    LODOP.PRINT_INIT("销售单小票");
    LODOP.SET_PRINT_STYLE("Alignment",2);
    LODOP.ADD_PRINT_TEXT(top,left,width,height,"销售单");
    LODOP.SET_PRINT_STYLEA(1,"FontSize",10);
    LODOP.SET_PRINT_STYLEA(1,"Bold",1);

    LODOP.SET_PRINT_STYLE("Alignment",1);
    LODOP.SET_PRINT_STYLE("FontSize",8);
    LODOP.ADD_PRINT_TEXT(top=top+height,left,width,height,"单据编号：" + a.sn );
    LODOP.ADD_PRINT_TEXT(top=top+height,left,width,height,"创建日期：" + a.bizdate);
    LODOP.ADD_PRINT_TEXT(top=top+height,left,width,height,"业务类型："+ a.state );
    LODOP.ADD_PRINT_TEXT(top=top+height,left,width,height,"会员名称：" + a.memberName);
    top+=height;
    LODOP.SET_PRINT_STYLE("Alignment",2);
    LODOP.ADD_PRINT_TEXT(top,left,width/8,height*2,"序号");
    LODOP.ADD_PRINT_TEXT(top,left+width/8,width/8,height*2,"名称");
    LODOP.ADD_PRINT_TEXT(top,left+width/8*2,width/8,height*2,"数量");
    LODOP.ADD_PRINT_TEXT(top,left+width/8*3,width/8,height*2,"原价");
    LODOP.ADD_PRINT_TEXT(top,left+width/8*4,width/8,height*2,"单价");
    LODOP.ADD_PRINT_TEXT(top,left+width/8*5,width/8,height*2,"总额");
    LODOP.ADD_PRINT_TEXT(top,left+width/8*6,width/8,height*2,"结算方式");
    LODOP.ADD_PRINT_TEXT(top,left+width/8*7,width/8,height*2,"说明");

    this._readEntryModel(a);
    this.on("data_init",this._printData);

},

_readEntryModel: function(a){
    $.get(this.entryUrl, {owner:a.id}, _.bind(function (result) {
        console.log(result);
        this.entryModel = result.records;
        console.log(this.entryModel);
        this.trigger("data_init");
    }, this));
},

_printData: function () {
    var a = this.grid.getSelectedRowData();

    var top = 110;
    var left = 10;
    var width = 320;
    var height = 20;
    var iCurLine = top+height*2;
    console.log(top + "----" + left + "----" + width + "----" + height);
    var n = 1;
    _.each(this.entryModel, _.bind(function (entry) {
        console.log(entry);
        var payStr = '';
        switch (entry.payment){
            case 10:
                payStr = '扣卡';
                break;
            case 20:
                payStr = '现金';
                break;
            case 30:
                payStr = '积分';
                break;
            case 40:
                payStr = '代金券';
                break;
            default:
                payStr = '无';
        }
        LODOP.ADD_PRINT_LINE(iCurLine-5,left,iCurLine-5,width+left,0,1);  //打印表格横向线
        LODOP.ADD_PRINT_TEXT(iCurLine,left,width/8,height+20,n);
        LODOP.ADD_PRINT_TEXT(iCurLine,left+width/8,width/8,height*2,entry.goodsName);
        LODOP.ADD_PRINT_TEXT(iCurLine,left+width/8*2,width/8,height*2,entry.quantity);
        LODOP.ADD_PRINT_TEXT(iCurLine,left+width/8*3,width/8,height*2,entry.goodsPrice);
        LODOP.ADD_PRINT_TEXT(iCurLine,left+width/8*4,width/8,height*2,entry.price);
        LODOP.ADD_PRINT_TEXT(iCurLine,left+width/8*5,width/8,height*2,entry.amount);
        LODOP.ADD_PRINT_TEXT(iCurLine,left+width/8*6,width/8,height*2,payStr);
        LODOP.ADD_PRINT_TEXT(iCurLine,left+width/8*7,width/8,height*2,entry.goodsRemark);
        iCurLine=iCurLine+height;//每行占25px
        n++;
    }, this));

    LODOP.ADD_PRINT_LINE(top-5,left+width/8,top+n*height*2-5,left+width/8,0,1);  //打印表格竖线
    LODOP.ADD_PRINT_LINE(top-5,left+width/8*2,top+n*height*2-5,left+width/8*2,0,1);  //打印表格竖线
    LODOP.ADD_PRINT_LINE(top-5,left+width/8*3,top+n*height*2+height+height*2-5,left+width/8*3,0,1);  //打印表格竖线
    LODOP.ADD_PRINT_LINE(top-5,left+width/8*4,top+n*height*2-5,left+width/8*4,0,1);  //打印表格竖线
    LODOP.ADD_PRINT_LINE(top-5,left+width/8*5,top+n*height*2-5,left+width/8*5,0,1);  //打印表格竖线
    LODOP.ADD_PRINT_LINE(top-5,left+width/8*6,top+n*height*2-5,left+width/8*6,0,1);  //打印表格竖线
    LODOP.ADD_PRINT_LINE(top-5,left+width/8*7,top+n*height*2-5,left+width/8*7,0,1);  //打印表格竖线

    LODOP.SET_PRINT_STYLE("Alignment",1);
    LODOP.ADD_PRINT_TEXT(iCurLine=iCurLine+height,left+5,width/2,height,"应收金额：" + a.receivable );
    LODOP.ADD_PRINT_TEXT(iCurLine,left+5+width/2,width/2,height,"实收金额：" + a.received);
    LODOP.ADD_PRINT_LINE(iCurLine-5,left,iCurLine-5,width+left,0,1);  //打印表格横向线
    LODOP.ADD_PRINT_TEXT(iCurLine=iCurLine+height,left+5,width/2,height*2,"创建人：" + a.creatorName);
    LODOP.ADD_PRINT_TEXT(iCurLine,left+5+width/2,width/2,height*2,"打印日期：" + (new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString());
    LODOP.ADD_PRINT_LINE(iCurLine-5,left,iCurLine-5,width+left,0,1);  //打印表格横向线

    LODOP.ADD_PRINT_RECT(top-5,left,width,n*height*2+height+height*2,0,1),

    LODOP.ADD_PRINT_RECT(10-10,10-5,width+10,n*height*2+height*6+height*2+10,0,1),
    // LODOP.PRINT_DESIGN();
    LODOP.PREVIEW();
},

