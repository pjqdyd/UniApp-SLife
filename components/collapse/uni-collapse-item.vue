<template>
	<view :class="setCollapseCellClass" :hover-class="disabled === true || disabled === 'true' ? '' : 'uni-collapse-cell--hover'">
		<view class="uni-collapse-cell__title" @click="onClick">
			<view class="iconfont uni-collapse-cell__title-inner">
				<view class="uni-collapse-cell__title-text">
					<image class="icon" :src="icon"></image>
					{{title}}
				</view>
			</view>
			
			<view class="uni-collapse-cell__title-arrow" :class="setActive">
				<uni-icon color="#666" size="20" type="arrowright"></uni-icon>
			</view>
			
		</view>
		<view class="uni-collapse-cell__content" :class="animation==='outer' ? 'uni-collapse-cell--animation' : ''" :style="{height:isOpen==='true' || isOpen=== true ? height + 'px' : '0px'}">
			<view :class="setContClass" :id="elId">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/collapse/uni-icon.vue'
	export default {
		name: 'uni-collapse-item',
		components: {
			uniIcon
		},
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				isOpen: this.open,
				height: 0,
				elId: elId
			};
		},
		watch: {
			open(val) {
				this.isOpen = val
			}
		},
		computed: {
			index() {
				return this.$parent.$children.indexOf(this)
			},
			nameSync() {
				return this.name === 0 ? this.index : this.name
			},
			setCollapseCellClass() {
				let classList = ['uni-collapse-cell']
				if (this.disabled === true || this.disabled === 'true') {
					classList.push('uni-collapse-cell--disabled')
				}
				if (this.isOpen === true || this.isOpen === 'true') {
					classList.push('uni-collapse-cell--open')
				}
				return classList
			},
			setActive() {
				let classList = []
				if (this.isOpen === true || this.isOpen === 'true') {
					classList.push('uni-active')
				}
				return classList
			},
			setContClass() {
				let classList = []
				if (this.isOpen === true || this.isOpen === 'true') {
					classList.push('uni-active')
				}
				if (this.animation === 'inner') {
					classList.push('uni-collapse-cell__inner')
				}
				return classList
			}
		},
		props: {
			animation: { //动画效果:inner内容动；outer容器动
				type: String,
				default: 'outer'
			},
			title: String, //列表标题
			name: { //唯一标识符
				type: [Number, String],
				default: 0
			},
			disabled: { //是否禁用
				type: [Boolean, String],
				default: false
			},
			open: { //是否展开
				type: [Boolean, String],
				default: false
			},
			icon: String, //图标
			
			thumb: String //缩略图
		},
		created() {
			let parent = this.$parent || this.$root
			let name = parent.$options.name

			while (parent && name !== 'uni-collapse') {
				parent = parent.$parent
				if (parent) {
					name = parent.$options.name
				}
			}
			this.parent = parent
		},
		// #ifdef H5
		mounted() {
			let view = uni.createSelectorQuery().select(`#${this.elId}`);
			view.fields({
				size: true
			}, data => {
				this.height = data.height
			}).exec();
		},
		// #endif
		// #ifndef H5
		onReady() {
			let view = uni.createSelectorQuery().select(`#${this.elId}`);
			view.fields({
				size: true
			}, data => {
				this.height = data.height
			}).exec();
		},
		// #endif
		methods: {
			onClick() {
				if (this.disabled) {
					return
				}
				let accordion = this.parent.accordion ? this.parent.accordion : false
				if (accordion === true || accordion === 'true') {
					this.$parent.$children.forEach(vm => {
						if (vm === this) {
							return
						}
						vm.isOpen = false
					})
				}
				if (this.isOpen == true || this.isOpen == "true") {
					this.isOpen = false
				} else {
					this.isOpen = true
				}
				this.$emit('onIsOpen', this.isOpen) //向外触发事件,给父组件传入isOpen的值
				this.parent.onChange && this.parent.onChange(this)
			}
		}
	}
</script>

<style lang="scss">
	@mixin collapse-hover {
		background-color: $uni-bg-color-hover;
	}

	@mixin collapse-disabled {
		opacity: 0.3;
	}

	$collapse-title-pd:$uni-spacing-col-lg $uni-spacing-row-lg;

	.icon {
		flex-shrink: 0;
		width: 50upx;
		height: 50upx;
		margin-right: 25upx;
		image {
			width: 50upx;
			height: 50upx;
		}
	}

	.uni-collapse-cell {
		position: relative;

		&--hover {
			@include collapse-hover;
		}

		&--open {
			@include collapse-hover;
		}

		&--disabled {
			@include collapse-disabled;
		}

		&--animation {
			transition: all 0.3s;
		}

		&:after {
			position: absolute;
			z-index: 3;
			right: 0;
			bottom: 0;
			left: 0px;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			background-color: #eeeeee;
		}

		&__title {
			padding: 10upx 35upx 10upx 30upx;
			height: 100upx;
			width: 100%;
			box-sizing: border-box;
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			&-extra {
				margin-right: 18upx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
			}

			&-img {
				height: $uni-img-size-base;
				width: $uni-img-size-base;
			}

			&-arrow {
				width: 40upx;
				height: 30px;
				transform: rotate(0deg);
				transform-origin: center center;
				transition: transform 0.3s;

				&.uni-active {
					transform: rotate(90deg);
				}
			}

			&-inner {
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}

			&-text {
				font-size: 33upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #707070;
				line-height: 1.5;
				overflow: hidden;
				display: flex;
			}
		}

		&__content {
			position: relative;
			width: 100%;
			overflow: hidden;
			background: $uni-bg-color;

			view {
				font-size: $uni-font-size-base;
			}
		}

		&__inner {
			opacity: 0;
			transform: translateY(-50%);
			transition: all 0.3s;
			transform-origin: center center;

			&.uni-active {
				opacity: 1;
				transform: translateY(0px);
			}
		}
	}
</style>
