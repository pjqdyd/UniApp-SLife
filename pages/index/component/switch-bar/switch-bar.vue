<template>
	<view>
		<view class='category-box'>
			<view class="category-item" :class="[currentItem==0 ? 'active' : '']" data-item='0' @click='handTapItem'>最新</view>
			<view class="category-item" :class="[currentItem==1 ? 'active' : '']" data-item='1' @click='handTapItem'>推荐</view>
			<view class="category-item" :class="[currentItem==2 ? 'active' : '']" data-item='2' @click='handTapItem'>热门</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentItem: "1"
			}
		},
		methods: {
			//监听分类栏点击事件, 完成顶部分类栏切换
			handTapItem: function(e) {
				var itemNum = e.currentTarget.dataset.item //获取点击的分类item序号
				console.log("点击了顶部栏" + itemNum)
				//设置currentItem为当前的点击item数, 完成class的激活
				if (this.currentItem == itemNum) {
					return false;
				} else {
					this.currentItem = itemNum
				}
			}
		}
	}
</script>

<style lang="scss">
	/* --------分类栏-------- */
	.category-box {
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
		background-color: whitesmoke;
		padding: 0 20% 0 20%;
		box-sizing: border-box;
		overflow: hidden;
		font-size: 14px;
		white-space: nowrap;
		position: relative;
	}

	.category-item {
		width: 85rpx;
		margin: 0 15px;
		text-align: center;
		display: inline-block;
	}

	.category-item.active {
		color: #ea5455;
		position: relative;
	}

	/* 表示category-item激活后,加入后面元素的样式-分类底部条 */
	.category-item.active:after {
		content: "";
		display: block;
		height: 4rpx;
		width: 85rpx;
		background: #ea5455;
		position: absolute;
		bottom: 0;
		border-radius: 16rpx;
	}
</style>
