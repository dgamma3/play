<template>
	<div style="height: 100%;width: 100%;background-color: #FFFFFF;overflow: hidden;">
		<div style="background-color: #FFFFFF;height: 100%;overflow: hidden;">
			<div style="margin: 20px 10px 0 10px;">
				<el-form>
					<el-row>
						<el-col :span="4">
							<el-form-item label="用户信息:" label-width="80px">
								<el-input v-model="query.info" placeholder="请输入用户信息"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="支付单号:" label-width="80px">
								<el-input v-model="query.order" placeholder="请输入支付单号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="饰品状态:" label-width="80px">
								<el-select clearable v-model="query.type" placeholder="请选择">
									<el-option label="增加" :value="1">
									</el-option>
									<el-option label="减少" :value="2">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="支付类型:" label-width="80px">
								<el-select clearable v-model="query.model" placeholder="请选择">
									<el-option label="微信支付" :value="1">
									</el-option>
									<el-option label="支付宝支付" :value="2">
									</el-option>
									<el-option label="余额支付" :value="3">
									</el-option>
									<el-option label="饰品存入" :value="4">
									</el-option>
									<el-option label="饰品回收" :value="5">
									</el-option>
									<el-option label="平台操作" :value="6">
									</el-option>
									<el-option label="下级返佣" :value="7">
									</el-option>
									<el-option label="兑换商城余额" :value="8">
									</el-option>
									<el-option label="商城余额支付" :value="9">
									</el-option>
									<el-option label="创建对战" :value="10">
									</el-option>
									<el-option label="加入对战" :value="11">
									</el-option>
									<el-option label="盲盒开箱排行奖励" :value="12">
									</el-option>
									<el-option label="幸运开箱排行奖励" :value="13">
									</el-option>
									<el-option label="对战开箱排行奖励" :value="14">
									</el-option>
									<el-option label="cdk领取" :value="15">
									</el-option>
									<el-option label="糖果支付" :value="16">
									</el-option>
									<el-option label="对战房退费" :value="18">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="支付状态:" label-width="80px">
								<el-select clearable v-model="query.status" placeholder="请选择">
									<el-option label="未支付" :value="0">
									</el-option>
									<el-option label="已支付" :value="1">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="支付时间:" label-width="80px">
								<el-date-picker v-model="query.add_time" type="datetimerange" align="left"
									value-format="timestamp" unlink-panels range-separator="至" start-placeholder="开始日期"
									end-placeholder="结束日期" :picker-options="picker_options" style="width: 100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="10">
							<el-form-item label="到账时间:" label-width="80px">
								<el-date-picker v-model="query.complete_time" type="datetimerange" align="center"
									value-format="timestamp" unlink-panels range-separator="至" start-placeholder="开始日期"
									end-placeholder="结束日期" :picker-options="picker_options" style="width: 100%">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label-width="20px">
								<el-button size="medium" type="primary" icon="el-icon-search" @click="search">搜索
								</el-button>
								<el-button size="medium" icon="el-icon-delete" @click="reset">重置
								</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div style="margin: 0 20px;overflow: auto;padding-bottom: 20px;">
				<template>
					<el-table v-loading="loading" :data="data" border height="100%" ref="table"
						:header-cell-style="{backgroundColor: '#fafafa',color:'#333333',fontWeight:'400',textAlign:'center'}"
						:row-style="{color:'#333333',fontWeight:'400',height:50+'px',textAlign:'center'}"
						:cell-style="{padding:5+'px'}" style="width: 100%;font-size: 14px;">
						<el-table-column align="center" type="selection" width="55">
						</el-table-column>
						<el-table-column align="center" prop="info" label="用户信息" min-width="180" show-overflow-tooltip>
							<template slot-scope="d">
								<div style="display: flex;">
									<img :src="repair(d.row.user.portrait)"
										style="width: 50px;height: 50px;cursor: pointer;" alt="">
									<div style="margin-left: 15px;text-align: left;">
										<div>
											{{ d.row.user.name ? d.row.user.name : d.row.user.email }}(ID:{{ d.row.user.id }})
											<template v-if="d.row.user.type == 2">
												<el-tag size="mini">主播</el-tag>
											</template>
											<template v-else-if="d.row.user.type == 3">
												<el-tag size="mini">推广</el-tag>
											</template>
											<template v-else-if="d.row.user.type == 4">
												<el-tag size="mini">官方机器人</el-tag>
											</template>
										</div>
										<div>steamid: {{ d.row.user.steamid ? d.row.user.steamid : '-' }}</div>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column align="left" prop="order" label="支付信息" min-width="80" show-overflow-tooltip>
							<template slot-scope="d">
								<div>
									支付单号: {{d.row.outorder}}
								</div>
								<div>
									支付信息: {{d.row.info}}
								</div>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="money" label="变动金额" min-width="80" show-overflow-tooltip>
							<template slot-scope="d">
								￥ {{d.row.money}}
							</template>
						</el-table-column>
						<el-table-column align="center" prop="surplus" label="剩余金额" min-width="80"
							show-overflow-tooltip>
							<template slot-scope="d">
								{{d.row.surplus ? '￥ ' + d.row.surplus : '-'}}
							</template>
						</el-table-column>
						<el-table-column align="center" prop="model" label="支付类型" min-width="80" show-overflow-tooltip>
							<template slot-scope="d">
								<template v-if="d.row.model == 1">微信支付</template>
								<template v-else-if="d.row.model == 2">支付宝支付</template>
								<template v-else-if="d.row.model == 3">余额支付</template>
								<template v-else-if="d.row.model == 4">饰品存入</template>
								<template v-else-if="d.row.model == 5">饰品回收</template>
								<template v-else-if="d.row.model == 6">平台操作</template>
								<template v-else-if="d.row.model == 7">下级返佣</template>
								<template v-else-if="d.row.model == 8">兑换商城余额</template>
								<template v-else-if="d.row.model == 9">商城余额支付</template>
								<template v-else-if="d.row.model == 10">创建对战</template>
								<template v-else-if="d.row.model == 11">加入对战</template>
								<template v-else-if="d.row.model == 12">盲盒开箱排行奖励</template>
								<template v-else-if="d.row.model == 13">幸运开箱排行奖励</template>
								<template v-else-if="d.row.model == 14">对战开箱排行奖励</template>
								<template v-else-if="d.row.model == 15">cdk领取</template>
								<template v-else-if="d.row.model == 16">糖果支付</template>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="type" label="变动类型" min-width="80" show-overflow-tooltip>
							<template slot-scope="d">
								<template v-if="d.row.type == 1"><el-tag size="mini">增加</el-tag></template>
								<template v-else-if="d.row.type == 2"><el-tag size="mini"
										type="danger">减少</el-tag></template>
							</template>
						</el-table-column>
						<el-table-column align="left" prop="time" label="时间" min-width="100" show-overflow-tooltip>
							<template slot-scope="d">
								<div>支付时间: {{d.row.add_time}}</div>
								<div>到账时间: {{d.row.complete_time}}</div>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="status" label="支付状态" min-width="80" show-overflow-tooltip>
							<template slot-scope="d">
								<template v-if="d.row.status == 1"><el-tag size="mini">已支付</el-tag></template>
								<template v-else-if="d.row.status == 0"><el-tag size="mini"
										type="danger">未支付</el-tag></template>
							</template>
						</el-table-column>
					</el-table>
					<div style="text-align: right;margin: 20px 0 0 0;">
						<el-pagination background @size-change="sizeChange" @current-change="currentChange"
							:current-page="page_info.page" :page-sizes="[10, 20, 50, 100, 200, 500]" :page-size="10"
							layout="total, sizes, prev, pager, next, jumper" :total="page_info.total">
						</el-pagination>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		ttGet,
		ttPost,
		repair,
		abrasion,
		quality,
		quality2
	} from "@/utils/util.js";

	export default {
		data() {
			return {
				img_url: this.$img_url,
				loading: true,
				page_info: {
					page: 1,
					limit: 10,
					total: 0,
				},
				data: [],
				query: {},
				picker_options: {
					shortcuts: [{
						text: '当天',
						onClick(picker) {
							const start = new Date().setHours(0, 0, 0, 0);
							const end = new Date().setHours(23, 59, 59, 999);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '本周',
						onClick(picker) {
							const start = new Date(new Date().toLocaleDateString()).getTime() - (new Date()
							.getDay() - 1) * 24 * 60 * 60 * 1000;
							const end = start + (7 * 24 * 60 * 60 - 1) * 1000;
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '本月',
						onClick(picker) {
							const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
							const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
							.getTime() + 24 * 60 * 60 * 1000 - 1;
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			};
		},
		mounted() {
			this.get_balance_record();
		},
		methods: {
			repair,
			abrasion,
			quality,
			quality2,

			//获取余额记录
			get_balance_record() {
				let page_info = this.page_info;
				let query = this.query;
				ttGet("/admin.php/record/get_balance_record", {
					page: page_info.page,
					limit: page_info.limit,
					info: query.info,
					order: query.order,
					type: query.type,
					model: query.model,
					status: query.status,
					add_time: query.add_time,
					complete_time: query.complete_time,
				}, (res) => {
					this.loading = false;
					if (res.code == 200) {
						this.data = res.data.data.data;
						this.page_info.total = res.data.data.count;
						let height = 50 + 61 * (res.data.data.data.length ? res.data.data.data.length : 1);
						this.$refs.table.$el.style.height = height + 'px';
					} else {
						this.$message({
							message: res.msg,
							type: 'warning'
						});
					}
				});
			},

			//分页切换
			currentChange(page) {
				this.page_info.page = page;
				this.loading = true;
				this.get_balance_record();
			},

			//条数切换
			sizeChange(limit) {
				this.page_info.page = 1;
				this.page_info.limit = limit;
				this.loading = true;
				this.get_balance_record();
			},

			//条件搜索
			search() {
				this.page_info.page = 1;
				this.loading = true;
				this.get_balance_record();
			},

			//重置条件
			reset() {
				this.page_info.page = 1;
				this.query = {};
				this.loading = true;
				this.get_balance_record();
			},
		}
	};
</script>

<style lang="scss" scoped>
	.my-dialog .el-dialog__header {
		padding: 0 0;
	}

	.my-table-home {
		margin-left: 20px;
		overflow: auto;
	}

	.my-table-home>table {
		font-size: 14px;
		line-height: 30px;
		text-align: left;
		border-collapse: collapse;
	}

	.my-table-home>table>tr {
		height: 30px;
		border-bottom: 1px dashed #EEEEEE;
	}

	.my-table-home>table td {
		max-width: 30%;
		white-space: nowrap;
		padding: 0 20px 0 0;
	}

	.syncBut {
		border-bottom: 3px solid #409EFF;
		color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>