
import fs from 'fs';

module.exports = class extends think.Controller {
  __before() {

  }

  //重写渲染方法
  async response(viewFileName = 'base') {
    // this.ctx.response.type=
    return this.display(viewFileName)
  }
};
