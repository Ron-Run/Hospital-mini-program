// components/tab/tab.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabSet: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleTap(e) {
            // console.log(e.currentTarget.dataset.index);
            let index = e.currentTarget.dataset.index;
            this.triggerEvent('getIndex', { index })

        }
    }
})