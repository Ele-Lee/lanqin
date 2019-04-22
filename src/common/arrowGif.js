export default {
    data() {
        return {
            leftArrow: undefined,
            rightArrow: undefined
        }
    },
    created() {
        this.leftArrow = require('@imgs/arrow_left.gif');
        this.rightArrow = require('@imgs/arrow_right.gif');
    },
    beforeDestory() {

    }
}
