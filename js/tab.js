var that;
//功能需求
//对象：tab对象，拥有功能
//点击tab可以切换
//可以新增
//可以删除
//可以修改
//
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.add = this.main.querySelector(".tabadd");
        this.ul = document.querySelector(".fisrstnav ul");
        this.con = document.querySelector(".tabscon");
        this.del = document.querySelectorAll(".icon-guanbi");
        this.init(); //new实例化对象时就调用
    }

    init() {
            //初始化操作，给所有元素绑定相应事件
            //通过for循环给每一个li添加点击事件
            this.update();
            this.add.onclick = this.addTab;

            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab; //直接将绑定Toggle函数
                this.del[i].onclick = this.delTab;
                // this.spans[i].ondbclick = this.editTab;//xx少了个 l，dblclick ！！！
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].addEventListener("dblclick", this.editTab);
            }

        }
        // 因为我们动态添加元素 需要从新获取对应的元素
    update() {
        //重新获取所有li和section
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.del = document.querySelectorAll(".icon-guanbi");
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    clearClass() {
            //清除其他元素的类，排他操作
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        //1.切换功能
    toggleTab() {
            // console.log(this.index);

            that.clearClass();
            this.className = "liactive";
            that.sections[this.index].className = "conactive"
        }
        //2.添加功能
    addTab() {

            that.clearClass(); //清除其他元素的类
            var random = Math.random();
            //传统做法
            //1.创建元素
            // var newLi = document.createElement("li");
            // var newSection = document.createElement("section");
            // newLi.innerHTML = "<span>newTab</span><span class='iconfont icon-guanbi'></span>";
            // newLi.className = 'liactive';
            // newSection.className = 'conactive';

            // newSection.innerHTML = "" + random + "";
            // //2.添加到父元素
            // this.ul.appendChild(newLi);
            // this.con.appendChild(newSection);


            //2.精简做法
            //insertAdjacentHtml可以插入字符串标签。
            // 1.创建元素
            var li = "<li class='liactive'><span>new</span><span class='iconfont icon-guanbi'></span></li>";
            var section = '<section class="conactive">' + random + '</section>';
            // 2.添加元素，
            that.ul.insertAdjacentHTML('beforeend', li);
            that.con.insertAdjacentHTML('beforeend', section);
            //
            that.init();

        }
        //3.删除功能
    delTab(e) {
            e.stopPropagation();
            var index = this.parentNode.index;
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            if (document.querySelector('.liactive')) return; //假如关闭被选中的前面的标签，就让它保持选中状态。不执行下面的语句
            index--; // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
            that.lis[index] && that.lis[index].click(); //被关闭的前一个处于选中状态

        }
        //4.修改功能
    editTab() {

        var str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" value="' + str + '">';
        var input = this.children[0];
        input.select(); //文本框里面的文字处于选定状态
        input.onblur = function() { // 当我们离开文本框就把文本框里面的值给span 
                this.parentNode.innerHTML = this.value;
            }
            // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件  不需要鼠标离开操作
                this.blur();
            }
        }

    }

}

new Tab("#tab");