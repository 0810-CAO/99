const {
  GOODS_LIST,
  GOODS_DETAIL,
  GOODS_EDIT,
  GOODS_NEW,
} = require('./routerConst')
const goodsRouterHandle = (req, res) => {
  if (req.method === 'get' && req.path === GOODS_LIST) {
    // 处理商品列表
    return {
      code: 200,
      data: {
        name: '001'
      }
    }
  } else if (req.method === 'get' && req.path === GOODS_DETAIL) {
    // 处理商品详情
    return {
      code: 200,
      data: {
        name: 'ccx',
        price: 80
      }
    }
  } else if (req.method === 'get' && req.path === GOODS_EDIT) {
    // 处理编辑商品
    return {
      code: 200,
      data: "处理编辑商品"
    }
  } else if (req.method === 'get' && req.path === GOODS_NEW) {
    // 处理新的商品
    return {
      code: 200,
      data: "处理新的商品"
    }
  }
}
module.exports = goodsRouterHandle