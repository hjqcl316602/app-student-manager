export default {
  data(){
    return {

      vipDeal:{
        pageNum:1,
        pageSize:10,
        list:[],
        totalNum:0,
        pageCount:0
      },
      vip:{
        pageNum:1,
        pageSize:10,
        list:[],
        totalNum:0,
        pageCount:0
      },
      vip_fee:{
        list:[]
      }

    }
  },
  methods:{

    //获取待审核的班级
    $get_vip_audit_deal_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/vip/toAudit.do',
          loading: loading,
          data:{
            search:params.search,
            pageNum:this.vipDeal.pageNum,
            pageSize:this.vipDeal.pageSize
          }

        }).then((response) => {
          this.vipDeal.list = response['data']['list'];
          this.vipDeal.pageCount = response['data']['pageCount'];
          this.vipDeal.totalNum = response['data']['totalNum'];

          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取待审核班级失败!';
          this.$message({
            message: msg,
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //获取已审核的班级
    $get_vip_audit_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/vip/audit.do',
          loading: loading,
          data:{
            search:params.search,
            pageNum:this.vip.pageNum,
            pageSize:this.vip.pageSize
          }

        }).then((response) => {
          this.vip.list = response['data']['list'];
          this.vip.pageCount = response['data']['pageCount'];
          this.vip.totalNum = response['data']['totalNum'];

          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取已审核班级失败!';
          this.$message({
            message: msg,
            type: 'warning'
          });
          reject(error)
        })
      })
    },

    //更新状态，即审核
    $update_status( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/vip/updateAudit.do',
          loading: loading,
          data :{
            vipRecordId:params.vipRecordId,
            status:params.status,
            evaluate:params.evaluate
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改状态失败!';
          this.$message({
            message: msg,
            type: 'warning'
          });
          reject(error)
        })
      })
    },

    //获取认证费用设置
    $get_vip_fee_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/vip/vipFeeList.do',
          loading: loading,
        }).then((response) => {
          this.vip_fee.list = response['data']
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '获取费用认证列表失败!';
          this.$message({
            message: msg,
            type: 'warning'
          });
          reject(error)
        })
      })
    },

    //修改费用认证
    $update_vip_fee( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/vip/updateVipFee.do',
          loading: loading,
          data :{
            id:params.id,
            name:params.name,
            originPrice:params.originPrice,
            price:params.price,
            remark:params.remark,
            promotionStatus:params.promotionStatus,
            promotionEndTime:params.promotionEndTime,
          }
        }).then((response) => {
          this.$get_vip_fee_list();
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改费用认证失败!';
          this.$message({
            message: msg,
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //修改费用认证状态
    $update_vip_fee_status( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/vip/closeVipFee.do',
          loading: loading,
          data :{
            id:params.id,
            status:params.status
          }
        }).then((response) => {
          this.$get_vip_fee_list();
          resovle(response)
        }, (error) => {
          let msg = ( error['msg'] && error['msg'] !== 'error') ? error['msg'] : '修改费用认证状态失败!';
          this.$message({
            message: msg,
            type: 'warning'
          });
          reject(error)
        })
      })
    },

  }
}
