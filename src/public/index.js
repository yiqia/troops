/*
    @author: 付伟琪
    @function：
    @date 2021-01-31 09:56
*/
Date.prototype.Format = function()
{
    const date = this.toLocaleDateString().replace(/\//g,'-'); //获取当前日期
    const time=this.toLocaleTimeString().replace(/[^0-9\-:]/g,''); //获取当前时间
    return date+' '+time
}
