<template>
	<div id="taxation" class="page-body">
		<!-- 标题栏 -->
		<header-bar :header="header"></header-bar>
		<!-- 内容主体 -->
		<div class="check-tax-warp">
			<p class="check-tax-secound">房屋交易税费说明如下，请查看：</p>
			<div class="table-warp">
				<h1>契税：</h1>
				<table>
					<tbody>
						<tr>
							<td>
								普通住宅：首次购买90平以内的1%、首次购买90-140平以内的1.5%、非首次购买的3%
							</td>
						</tr>
						<tr>
							<td>
								非普通住宅：合同标的额的3%
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-warp">
				<h1>营业税（含城建税、教育附加、地方教育附加）:</h1>
				<table>
					<tbody>
						<tr>
							<td rowspan="2" style="width:3rem;">
								普通住宅
							</td>
							<td style="width:34%;">
								两年内
							</td>
							<td style="width:34%;">
								全额*5.6%
							</td>
						</tr>
						<tr>
							<td style="width:34%;">
								两年外
							</td>
							<td style="width:34%;">
								不征收
							</td>

						</tr>
						<tr>
							<td rowspan="2" style="width:3rem;">
								非普通住宅
							</td>
							<td style="width:34%;">
								两年内
							</td>
							<td style="width:34%;">
								全额*5.6%
							</td>
						</tr>
						<tr>
							<td style="width:34%;">
								两年外
							</td>
							<td style="width:34%;">
								差额*5.6%
							</td>

						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-warp">
				<h1>综合地价款:</h1>
				<table>
					<tbody>
						<tr>
							<td rowspan="4" style="width:1rem;">
								经济适用房
							</td>
							<td rowspan="2" style="width:34%;">
								08.4.8前签订购房合同
							</td>
							<td style="width:20%;">
								五年内
							</td>
							<td style="width:34%;">
								---
							</td>
						</tr>
						<tr>
							<td style="width:20%;">
								五年外
							</td>
							<td style="width:34%;">
								可以按市场价出售，按出售价格的10%补交综合地价款
							</td>
						</tr>
						<tr>
							<td rowspan="2" style="width:34%;">
								08.4.8后签订购房合同
							</td>
							<td style="width:20%;">
								五年内
							</td>
							<td style="width:34%;">
								只能自住，如需转让，只能通过摇号回购方式执行。
							</td>
						</tr>
						<tr>
							<td style="width:20%;">
								五年外
							</td>
							<td style="width:34%;">
								可以按市场价出售，应按原始购房价和当前出售价差额的70% 综合地价款。
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-warp">
				<h1>个人所得税：</h1>
				<table>
					<tbody>
						<tr>
							<td>
								1、个人所得税=（本次售价-房屋原值-本次营业税-原契税-本次网签金额10%-产权人贷款购房的贷款利息）*20%
							</td>
						</tr>
						<tr>
							<td>
								2、对个人转让自用5年以上，且是家庭唯一生活用房，免征个人所得税
							</td>
						</tr>
						<tr>
							<td>
								3、对于税务机关无法核实到原值的，暂定计算方式为：本次房屋转让价格*1%
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-warp">
				<h1>土地出让金：</h1>
				<table>
					<tbody>
						<tr>
							<td>
								房改房
							</td>
							<td>
								1560元/平*1%*建筑面积
							</td>
						</tr>
						<tr>
							<td>
								商品房
							</td>
							<td>
								土地性质为划拨的商品房：合同标的额*10%
							</td>
						</tr>
						<tr>
							<td>按经济适用房管理</td>
							<td>
								本次网签价*3%（原始购房协议上体现为集资建房或合作建设的，税率为10%的）
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="table-footer">
				购房时间认定:<br> 购房时间以契税完税凭证或房产证上时间孰先原则确定
			</p>
		</div>
	</div>
</template>

<script>
import headerBar from "@/components/headerBar";

export default {
  name: "loginTimeout",
  data() {
    return {
      header: {
        title: "查税费",
        isBack: true
      }
    };
  },
  created: function() {
    // 回到页面顶部
    scrollTo(0, 0);
  },
  components: {
    headerBar
  }
};
</script>

<style lang="less">
@fs: 100rem;
#taxation {
  background: #fff;
  .check-tax-warp {
    padding: 27 / @fs;
    .table-warp {
      padding-bottom: 30 / @fs;
    }
    h1 {
      width: 100%;
      height: 60 / @fs;
      line-height: 60 / @fs;
      color: #3e3e3e;
      font-size: 30 / @fs;
      display: block;
    }
    table {
      border: solid #3e3e3e;
      border-width: 1px 0px 0px 1px;
      width: 100%;
      display: block;
      border-collapse: collapse;
      td {
        font-size: 30 / @fs;
        padding: 16 / @fs;
        box-sizing: border-box;
        border-color: #3e3e3e;
        border: solid #3e3e3e;
        border-width: 0px 1px 1px 0px;
      }
    }
  }
  .check-tax-secound {
    width: 100%;
    height: 60 / @fs;
    line-height: 60 / @fs;
    border-bottom: 1px solid #9a9a9a;
    color: #3e3e3e;
    display: block;
    font-size: 36 / @fs;
    margin-bottom: 30 / @fs;
  }
}
</style>
