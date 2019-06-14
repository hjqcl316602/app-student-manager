<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import vip  from '../vue.mixins/vip'
  export default {
    name: "MainAuthenCost",
    components: {},
    mixins: [ vip ],
    data() {
      return {
        params:{
          type : 'info',
          open:false,

          id:'',
          name:'',
          price:'', // 现价
          originPrice:'', // 原价
          remark:'',
          promotionStatus:0,
          promotionEndTime:'',

        }
      }
    },
    mounted() {

    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.$get_vip_fee_list()
      },
      _operate_cost(type,item){
        if(type === 'update'){
          this.params.type = 'edit';
          this.params.id = item['id'];
          this.params.name = item['name'];
          this.params.price = numbers.getStrMoney(item['price']) ;
          this.params.remark = item['remark'];
          this.params.originPrice = numbers.getStrMoney(item['originPrice']) ;
          this.params.open = !!item['promotionStatus'] ;
          this.params.promotionEndTime = item['promotionEndTime'];
        }else if( type === 'status'){
          this.$update_vip_fee_status({ id : item['id'],status: item['status'] == 0 ? 1 : 0 })
        }
      },
      _save_cost(){
          let params = {
            id:this.params.id,
            name:this.params.name,
            originPrice:( this.params.originPrice * 100 ).toFixed(0),
            price:( this.params.price * 100 ).toFixed(0),
            remark:this.params.remark,
            promotionStatus:( this.params.open  ) ? 1 : 0 ,
            promotionEndTime:this.params.promotionEndTime ? dates.format(new Date(this.params.promotionEndTime),'yyyy-MM-dd HH:mm:ss') : '',
          };

          if( this.params.open &&  !this.params.promotionEndTime ){
            this.$message({
              message: '请选择优惠截止时间',
              type: 'warning'
            });
            return
          }


          this.$update_vip_fee(params).then(()=>{
            this.params.type = 'info'
          })
      },



    },
    watch: {
      '': {
        handler(val, olval) {

        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
  <div>
    <template v-if="params.type == 'info'">
      <table class="vp-table" >
        <colgroup>

        </colgroup>
        <tr class="vp-table--tr">
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">会员类目</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">现价</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">原价</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">状态</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">操作</div></td>
        </tr>
        <template v-if="vip_fee.list.length > 0 ">
          <tr class="vp-table--tr" v-for="(item,index) in vip_fee.list">
            <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--bold">{{ item['name'] }}</div></td>
            <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['price'] | str_money }}</div></td>
            <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['originPrice']  | str_money }}</div></td>
            <td class="vp-table--td">
              <div class="vp-table--content vc-text--danger" v-if="item['status'] == 1">已开启</div>
              <div class="vp-table--content vc-text--warning" v-if="item['status'] == 0">已关闭</div>
            </td>
            <td class="vp-table--td">
              <div class="vp-table--content vc-text--light">
                <el-button type="primary" @click.native="_operate_cost('update',item)">编辑</el-button>
                <el-button type="danger" @click.native="_operate_cost('status',item)" v-if="item['status'] == 1">关闭</el-button>
                <el-button type="warning" @click.native="_operate_cost('status',item)" v-if="item['status'] == 0">开启</el-button>
              </div>
            </td>
          </tr>


        </template>
        <template v-else>
          <div class="vc-padding__lg--ud">
            <div class="vc-text--gray vc-text--center">暂无费用认证设置列表</div>
          </div>
        </template>


      </table>
    </template>
    <template v-if="params.type == 'edit'">
      <div class="vc-row">
        <div class="vc-col--12">
          <div class="vc-margin__lg--bm vc-text--center">
            <span class="vc-text--bold">{{ params.name }}</span>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">原价：</div></div>
            <div class="vc-flex--fit">
              <el-input type="text" v-model="params.originPrice" placeholder="请输入原价..."></el-input>
            </div>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">描述：</div></div>
            <div class="vc-flex--fit">
              <el-input type="text" v-model="params.remark" placeholder="请输入描述..."></el-input>
            </div>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">开启优惠：</div></div>
            <div class="vc-flex--fit">
              <el-switch
                v-model="params.open"
                active-color="#409EFF"
                inactive-color="#cccccc">
              </el-switch>
            </div>
          </div>

          <template v-if="params.open">
            <div class="vc-flex vc-items--center vc-margin__lg--bm">
              <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">现价：</div></div>
              <div class="vc-flex--fit">
                <el-input type="text" v-model="params.price" placeholder="请输入现价..."></el-input>
              </div>
            </div>

            <div class="vc-flex vc-items--center vc-margin__lg--bm">
              <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">截止时间：</div></div>
              <div class="vc-flex--fit">
                <el-date-picker
                  v-model="params.promotionEndTime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </div>


          </template>

          <div class="vc-flex--center">
            <el-button type="" @click.native="params.type = 'info'">返回</el-button>
            <el-button type="primary" @click.native="_save_cost">保存</el-button>
          </div>

        </div>
      </div>
    </template>
  </div>
</template>
<style scoped></style>
