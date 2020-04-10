<template>
    <div class='banner'>
        <div class="line" style="position: absolute;bottom: -.23rem;width: 100%;border-bottom: .02rem solid #ededed;"></div>
        <!-- <swiper :options="swiperOption" class="swiper-box-banner index" ref="mySwiper">
            <swiper-slide v-for='item in json' :key='item.id' class="swiper-slide-box-box">
                <div class="swiper-slide-img-box" :style='"background-image:url("+item.ptitlepic+")"' >
                    <div class="banner_title">
                        <p>{{item.title}}</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper> -->
        <swiper :options="swiperOption" class="swiper-containerlistnew swiper-box-banner index" ref="mySwiper">
            <swiper-slide class="swiper-item listimgs swiper-slide-box-box" v-for='item in json' :key='item.id'  @click.native="detail(item)">
                <div class="slideimg">
                    <div class="slideimg-bgimg"  :style='"background-image:url("+item.ptitlepic+")"'></div>
                </div>
                <div class="middle-tittle">{{item.title}}</div>
                <div class="middle-bgc"></div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </div>
</template>
<script>
export default {
    props: ['json'],
    data() {
        return {
            //banner参数设置
             swiperOption:{
              pagination: '.swiper-pagination',
               loop: true, 
               autoplay : 2000,
              autoplayDisableOnInteraction: false,
            },
        }
    },
    methods: {
        url(item) {
            return `/detail?classid=${item.classid}&id=${item.id}&datafrom=${item.datafrom}&jsonUrl=${item.jsonUrl}&time=${item.time}`
        },
        detail(section){
            console.log( section )
            if (section.lives) {
                this.apis.urlParams(section.lives, { title: section.title }, true);
            } else if (section.href) {
                this.apis.urlParams(section.href, { title: section.title }, true);
            } else {
                this.apis.urlParams('Details',{'path':section})
            }
        }
    },
    mounted() {
        // var that=this;
        // $('.swiper-box-banner.index .swiper-wrapper').prepend('<div class="before" style="background: url('+that.json[that.json.length-2].ptitlepic+') no-repeat 0 / 100%"></div>').append('<div class="after" style="background: url('+that.json[1].ptitlepic+') no-repeat 0 / 100%;left: calc('+(100*(that.json.length+2))+'% + 5px)"></div>')
        // $('.swiper-box-banner.index').on('click','.swiper-slide-box-box',function (e) {
        //     e.stopPropagation()
        //     e.preventDefault()
        //     that.apis.urlParams('Details',{'path':that.json[$(this).data('swiper-slide-index')]})
        // })
    }
}
</script>
<style lang='stylus'>
banner_height=4.3375rem
.banner{ width:100%;position:relative;top:0; height: 4rem;}
.banner .listimgs{ position:relative; }
.banner .listimgs .middle-tittle{position:absolute;bottom:.22rem;font-size:.36rem;color:#fff;left:.28rem;width: 70%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;z-index: 1;}
.banner .listimgs .middle-bgc{ position:absolute;height:60px;  background: linear-gradient(to bottom, rgba(255,0,0,0), rgba(0,0,0,1));width:100%;bottom:0; }
.banner .listimgs img{ width: 100%; height: 100%;}
.banner .swiper-containerlistnew{width:100%;   height: 4rem;border-radius:5px}
.banner .swiper-containerlistnew .swiper-pagination-bullets{left:46%; width:40%;bottom:1.5%}
.banner .slideimg{width:100%;height: 4rem;}
.banner .slideimg-bgimg{  background-repeat: no-repeat;background-position: center;background-size: cover;height: 100%; width: 100%; }
.banner  .swiper-pagination-bullet{ background: #ccc}
.banner  .swiper-pagination-bullet.swiper-pagination-bullet-active{width:20px;height:4px;    border-radius:5px; background: #ffffff}
.banner {
    // display:none 
    position: relative;
    padding: 0 0 10px;
    margin:0 0.3rem;
    width: calc(100% - .6rem);
    // .swiper-box-banner {
    //     width: calc(100% - 40px);
    //     height: 3.8rem;
    //     overflow: visible !important;
    //     position: relative
    //     .swiper-slide-box-box {
    //         padding: 0 5px;
    //         .swiper-slide-img-box {
    //             background-repeat: no-repeat;
    //             background-position: center;
    //             background-size: cover;
    //             height: 100%;
    //             width: 100%;
    //             border-radius: 5px;
    //             box-shadow: 0px 1px 3px 0px #c1c1c1;
    //         }
    //     }
    //     .swiper-wrapper {
    //         .before {
    //             content: '';
    //             display: inline-block;
    //             position: absolute;
    //             width: 100%;
    //             height: 100%;
    //             right: calc(100% + 5px);
    //             border-radius: 5px;
    //         }
    //         .after {
    //             content: '';
    //             display: inline-block;
    //             position: absolute;
    //             width: 100%;
    //             height: 100%;
    //             // left: 100%;
    //             border-radius: 5px;
    //         }
    //     }
    // }
    .swiper-pagination {
        right: 50%;
        bottom: 5px;
        transform: translate(50%,0);
        .swiper-pagination-bullet {
            width: 4px;
            height: 4px;
            background: #fff;
            margin: 0 4px;
            border-radius: 3px;
            opacity: 0.8;
            &.swiper-pagination-bullet-active {
                width: 30px !important;
                opacity: 0.9;
            }
        }
    }
    .banner_title {
        position: absolute;
        width: calc(100% - 10px);
        bottom: 0;
        left: 5px;
        color: #fff;
        background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0.24) 40%, rgba(0, 0, 0, 0.29) 47%, rgba(0, 0, 0, 0.65) 95%);
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0.24) 40%, rgba(0, 0, 0, 0.29) 47%, rgba(0, 0, 0, 0.65) 95%);
        z-index: 222;
        padding: 10px 8px 22px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        p {
            // width: 85%;
            font-size: .32rem;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
