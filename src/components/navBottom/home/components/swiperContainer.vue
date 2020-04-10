<template>
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper" :class="{isIOS: $store.state.device == 'ios'}">
        <swiper-slide v-for='(item,index) in indexColumn' :key='index' class="swiper-slide-box">
            <template v-if="apis.getTheme() == 'chaoyang' && item.classpath==apis.theme.news.columnId.kanTV">
                <!-- <div class="lianghui">
                    <div v-for="(item,index) in lianghuiList" :key="index">
                        <div v-if="item.classid==apis.theme.news.lianghuiChild[2]" @click.stop="apis.urlParams('./news/xinshidai.html',item)"></div>
                        <div v-else @click.stop="apis.urlParams('./news/lianghui.html',item)"></div>
                    </div>
                </div> -->
                 <div class="child-tab">
                    <mt-tabbar v-model="childTabActive">
                        <mt-tab-item v-for="(item,index) in childTabList" :key="index" :id="item.uuid" class="wenlv-child-tab">
                            {{item.name}}
                        </mt-tab-item>
                    </mt-tabbar>
                    <mt-tab-container v-model="childTabActive">
                        <mt-tab-container-item v-for="(item,index) in childTabList" :key="index" :id="item.uuid">
                            <pullContainer :type='item.uuid' :childTabActive="childTabActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </div>
            </template>
            <template v-if="item.classpath==apis.theme.news.columnId.chuangcheng">
                <!-- 子级tab页 -->
                <div class="child-tab">
                    <mt-tabbar v-model="chuanchengActive">
                        <mt-tab-item v-for="(item,index) in chuanchengList" :key="index" :id="item.uuid" class="wenlv-child-tab">
                            {{item.name}}
                        </mt-tab-item>
                    </mt-tabbar>
                    <mt-tab-container v-model="chuanchengActive">
                        <mt-tab-container-item v-for="(item,index) in chuanchengList" :key="index" :id="item.uuid">
                            <pullContainer :type='item.uuid' :childTabActive="chuanchengActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </div>
            </template>
            <template v-if="apis.getTheme() == 'wenchang' && item.classpath == '5d5b7bc7e4b07bac64e0d148'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in wenmingList"  @click="navClick(item.uuid)" :class="{ active:wenmingActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="wenmingActive">
                        <mt-tab-container-item
                        v-for="(item,index) in wenmingList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="wenmingActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <!-- <template v-if="apis.getTheme() == 'puyang' && item.classpath == '5d68ce3ce4b0e2963a40883f'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in longxiangList"  @click="longxiangNavClick(item.uuid)" :class="{ active:longxinagActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="longxinagActive">
                        <mt-tab-container-item
                        v-for="(item,index) in longxiangList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="longxinagActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer>
                </nav>
            </template> -->
            <template v-if="apis.getTheme() == 'puyang' && item.classpath == '5d68ce2ce4b0e2963a40883d'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in shengshixiangList"  @click="newsNavClick(item.uuid)" :class="{ active:shegnshiActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="shegnshiActive">
                        <mt-tab-container-item
                        v-for="(item,index) in shengshixiangList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="shegnshiActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'haicang' && item.classpath == '5cc550cc0cf2c3d1b7e9d4be'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in lianganxiangList"  @click="newsNavClicks(item.uuid)" :class="{ active:lianganActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="lianganActive">
                        <mt-tab-container-item
                        v-for="(item,index) in lianganxiangList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="lianganActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'dongpo' && item.classpath == '5ce9f0190cf23213ac8df4ec'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in zhuanlanList"  @click="newsNavClickslist(item.uuid)" :class="{ active:zhuanlanActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="zhuanlanActive">
                        <mt-tab-container-item
                        v-for="(item,index) in zhuanlanList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="zhuanlanActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
             <template v-if="apis.getTheme() == 'dongpo' && item.classpath == '5d6e348be4b0e2963a408a8d'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in afarmerList"  @click="afarmerClickslist(item.uuid)" style="padding:0 0.53rem;" :class="{ active:afarmerActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="afarmerActive">
                        <mt-tab-container-item
                        v-for="(item,index) in afarmerList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="afarmerActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'baisha' && item.classpath == '5d8c79b3e4b09940a1515bb5'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in shijianList"  @click="shijianClickslist(item.uuid)" :class="{ active:shijianActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="shijianActive">
                        <mt-tab-container-item
                        v-for="(item,index) in shijianList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="shijianActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'baisha' && item.classpath == '5d8c79cae4b09940a1515bb9'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in tuopinList"  @click="tuopinClickslist(item.uuid)" :class="{ active:tuopinActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="tuopinActive">
                        <mt-tab-container-item
                        v-for="(item,index) in tuopinList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="tuopinActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'baisha' && item.classpath == '5d8c79e8e4b09940a1515bc0'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in wenlvList"  @click="wenlvClickslist(item.uuid)" :class="{ active:wenlvActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="wenlvActive">
                        <mt-tab-container-item
                        v-for="(item,index) in wenlvList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="wenlvActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'baisha' && item.classpath == '5d8c79d4e4b09940a1515bbc'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in zhengfaList"  @click="zhengfaClickslist(item.uuid)" :class="{ active:zhengfaActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="zhengfaActive">
                        <mt-tab-container-item
                        v-for="(item,index) in zhengfaList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="zhengfaActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'wanning' && item.classpath == '5d8c1c6ae4b09940a1515af1'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in wanning_wmsj"  @click="wanningWmsjClick(item.uuid)" :class="{ active:wanning_wmsjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="wanning_wmsjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in wanning_wmsj"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="wanning_wmsjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    <!-- <pullContainer :type="item.uuid" :childTabActive="childTabActive"></pullContainer> -->
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'wanning' && item.classpath == '5d908b33e4b0ab24122c053d'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in wanning_tpgj"  @click="wanningTpgjClick(item.uuid)" :class="{ active:wanning_tpgjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="wanning_tpgjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in wanning_tpgj"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="wanning_tpgjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'wanning' && item.classpath == '5d908b3fe4b0ab24122c0541'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in wanning_wnsc"  @click="wanningWnscClick(item.uuid)" :class="{ active:wanning_wnscActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="wanning_wnscActive">
                        <mt-tab-container-item
                        v-for="(item,index) in wanning_wnsc"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="wanning_wnscActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'wanning' && item.classpath == '5d908b46e4b0ab24122c0543'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in wanning_tswl"  @click="wanningTswlClick(item.uuid)" :class="{ active:wanning_tswlActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="wanning_tswlActive">
                        <mt-tab-container-item
                        v-for="(item,index) in wanning_tswl"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="wanning_tswlActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'hangkong' && item.classpath == '5d8c5380e4b09940a1515b3f'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in hangkong_tdgz"  @click="hangkongTdgzClick(item.uuid)" :class="{ active:hangkong_tdgzActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="hangkong_tdgzActive">
                        <mt-tab-container-item
                        v-for="(item,index) in hangkong_tdgz"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="hangkong_tdgzActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'hangkong' && item.classpath == '5d8c5394e4b09940a1515b40'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in hangkong_gnll"  @click="hangkongGnllClick(item.uuid)" :class="{ active:hangkong_gnllActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="hangkong_gnllActive">
                        <mt-tab-container-item
                        v-for="(item,index) in hangkong_gnll"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="hangkong_gnllActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'hangkong' && item.classpath == '5d8c53a9e4b09940a1515b41'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in hangkong_jsjs"  @click="hangkongJsjsClick(item.uuid)" :class="{ active:hangkong_jsjsActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="hangkong_jsjsActive">
                        <mt-tab-container-item
                        v-for="(item,index) in hangkong_jsjs"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="hangkong_jsjsActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'hangkong' && item.classpath == '5d8c53b5e4b09940a1515b42'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in hangkong_wqzb"  @click="hangkongWqzbClick(item.uuid)" :class="{ active:hangkong_wqzbActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="hangkong_wqzbActive">
                        <mt-tab-container-item
                        v-for="(item,index) in hangkong_wqzb"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="hangkong_wqzbActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'hangkong' && item.classpath == '5d8c53e3e4b09940a1515b43'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in hangkong_gfgy"  @click="hangkongGfgyClick(item.uuid)" :class="{ active:hangkong_gfgyActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="hangkong_gfgyActive">
                        <mt-tab-container-item
                        v-for="(item,index) in hangkong_gfgy"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="hangkong_gfgyActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'hangkong' && item.classpath == '5d8c53e3e4b09940a1515b44'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in hangkong_zlgh"  @click="hangkongZlghClick(item.uuid)" :class="{ active:hangkong_zlghActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="hangkong_zlghActive">
                        <mt-tab-container-item
                        v-for="(item,index) in hangkong_zlgh"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="hangkong_zlghActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'lingao' && item.classpath == '5da5acece4b0f0e6b01f39cd'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in lgWmsjList"  @click="lingaoWmsjClick(item.uuid)" :class="{ active:lingao_wmsjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="lingao_wmsjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in lgWmsjList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="lingao_wmsjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'lingao' && item.classpath == '5dabd91ee4b0e4f27ae7c603'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in lgTpgjList"  @click="lingaoTpgjClick(item.uuid)" :class="{ active:lingao_tpgjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="lingao_tpgjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in lgTpgjList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="lingao_tpgjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'lingao' && item.classpath == '5dabd93ae4b0e4f27ae7c609'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in lgTswlList"  @click="lingaoTswlClick(item.uuid)" :class="{ active:lingao_tswlActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="lingao_tswlActive">
                        <mt-tab-container-item
                        v-for="(item,index) in lgTswlList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="lingao_tswlActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'lingao' && item.classpath == '5dabd931e4b0e4f27ae7c607'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in lgLgscList"  @click="lingaoLgscClick(item.uuid)" :class="{ active:lingao_lgscActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="lingao_lgscActive">
                        <mt-tab-container-item
                        v-for="(item,index) in lgLgscList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="lingao_lgscActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'chengmai' && item.classpath == '5da5aba7e4b0f0e6b01f39c4'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cmShijianList"  @click="chengmaiShijianClick(item.uuid)" :class="{ active:chengmai_wmsjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="chengmai_wmsjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cmShijianList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="chengmai_wmsjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'chengmai' && item.classpath == '5daffc1be4b00d124a7c0252'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cmTswlList"  @click="chengmaiTswlClick(item.uuid)" :class="{ active:chengmai_tswlActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="chengmai_tswlActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cmTswlList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="chengmai_tswlActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'chengmai' && item.classpath == '5daffbaee4b00d124a7c0240'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cmTpgjList"  @click="chengmaiTpgjClick(item.uuid)" :class="{ active:chengmai_tpgjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="chengmai_tpgjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cmTpgjList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="chengmai_tpgjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'chengmai' && item.classpath == '5daffbe8e4b00d124a7c024a'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cmCmscList"  @click="chengmaiCmscClick(item.uuid)" :class="{ active:chengmai_cmscActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="chengmai_cmscActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cmCmscList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="chengmai_cmscActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'changjiang' && item.classpath == '5da5ad29e4b0f0e6b01f39d5'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cjWmsjList"  @click="changjiangWmsjClick(item.uuid)" :class="{ active:changjiang_wmsjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="changjiang_wmsjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cjWmsjList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="changjiang_wmsjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'changjiang' && item.classpath == '5db00270e4b00d124a7c026d'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cjTpgjList"  @click="changjiangTpgjClick(item.uuid)" :class="{ active:changjiang_tpgjActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="changjiang_tpgjActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cjTpgjList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="changjiang_tpgjActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
             <template v-if="apis.getTheme() == 'changjiang' && item.classpath == '5db002d6e4b00d124a7c0280'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cjTswlList"  @click="changjiangTswlClick(item.uuid)" :class="{ active:changjiang_tswlActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="changjiang_tswlActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cjTswlList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="changjiang_tswlActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'changjiang' && item.classpath == '5db002a8e4b00d124a7c0277'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in cjCjscList"  @click="changjiangCjscClick(item.uuid)" :class="{ active:changjiang_cjscActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="changjiang_cjscActive">
                        <mt-tab-container-item
                        v-for="(item,index) in cjCjscList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="changjiang_cjscActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            <template v-if="apis.getTheme() == 'wenchang' && item.classpath == '5db0323be4b00d124a7c02ef'">
                <nav class="homeNavFixed childNav">
                    <div class="nav_ul nav_home zhuanti" @touchstart="touch($event)" @touchmove="touchmove($event)">
                        <a href='javascript:;' v-for="(item,index) in wcwcgsList"  @click="wenchangWcgsClick(item.uuid)" :class="{ active:wenchang_wcgsActive == item.uuid }" :key="index">{{item.name}}
                        </a>
                    </div>
                    <mt-tab-container v-model="wenchang_wcgsActive">
                        <mt-tab-container-item
                        v-for="(item,index) in wcwcgsList"
                        :key="index"
                        :id="item.uuid"
                        >
                        <pullContainer :type="item.uuid" :childTabActive="wenchang_wcgsActive"></pullContainer>
                        </mt-tab-container-item>
                    </mt-tab-container>
                </nav>
            </template>
            
            <template v-else>
                <pullContainer :type='item.classpath'></pullContainer>
            </template>
        </swiper-slide>
    </swiper>
</template>
<script>
import pullContainer from '../components/pullContainer'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import apis from '../../../../../src/assets/js/api.js'
export default {
    components: {
        pullContainer
    },
    data () {
        return {
            swiperOption: {
                notNextTick: true,
                onSlideChangeStart: this.slideChangeCallBack,
                onSliderMove: this.slideMoveCallBack,
                onTouchEnd: this.touchEndCallBack,
            },
            lianghuiList: [],
            childTabActive: apis.theme.news.columnIdChild[0],
            chuanchengActive:apis.theme.news.columnIdChild[0],
            wenmingActive:'5d5b7bd0e4b07bac64e0d14a',
            longxinagActive:'5d68cf18e4b0e2963a408845',
            shegnshiActive:'5d6cc95ce4b0e2963a408933',
            lianganActive:'5cc551840cf2c3d1b7e9d4c0',
            zhuanlanActive:'5d89eeeae4b09940a15159ab',
            shijianActive:'5d8c7b08e4b09940a1515bc9',
            tuopinActive:'5d8c7b35e4b09940a1515bd2',
            wenlvActive:'5d8c7b58e4b09940a1515bd8',
            zhengfaActive:'5daebb38e4b0e4f27ae7c7ee',
            wanning_wmsjActive:'5d9bfc7ae4b0868a6bc4b366',
            wanning_tpgjActive:'5d9bfc9de4b0868a6bc4b36f',
            wanning_wnscActive:'5d9bfcbfe4b0868a6bc4b375',
            wanning_tswlActive:'5d9bfcd8e4b0868a6bc4b37b',
            hangkong_tdgzActive:'5d9ed05ee4b0f0e6b01f352b',//航空客户端 热点关注 子栏目第一个id
            hangkong_gnllActive:'5d9ed09be4b0f0e6b01f3531',//航空客户端 概念理论 子栏目第一个id
            hangkong_jsjsActive:'5d9ed0b9e4b0f0e6b01f353b',//航空客户端 军事技术 子栏目第一个id
            hangkong_wqzbActive:'5d9ed0fce4b0f0e6b01f3540',//航空客户端 武器装备 子栏目第一个id
            hangkong_gfgyActive:'5d9ed14de4b0f0e6b01f3546',//航空客户端 国防工业 子栏目第一个id
            hangkong_zlghActive:'5d9ed181e4b0f0e6b01f3552',//航空客户端 战略规划 子栏目第一个id
            afarmerActive:'5d9ff4b1e4b0f0e6b01f3683',
            lingao_wmsjActive:'5dac0c89e4b0e4f27ae7c623',//临高特色文旅子栏目第一个
            lingao_tpgjActive:'5dac0cc6e4b0e4f27ae7c62b',//临高脱贫攻坚子栏目第一个
            lingao_tswlActive:'5dac0d37e4b0e4f27ae7c636',//临高特色文旅子栏目第一个
            lingao_lgscActive:'5dac0d2de4b0e4f27ae7c632',//临高临高双创子栏目第一个
            chengmai_wmsjActive:'5daffb75e4b00d124a7c0238',//澄迈文明实践子栏目第一个
            chengmai_tpgjActive:'5daffbbce4b00d124a7c0242',//澄迈脱贫攻坚子栏目第一个
            chengmai_tswlActive:'5daffc25e4b00d124a7c0254',//澄迈特色文旅子栏目第一个
            chengmai_cmscActive:'5daffbf6e4b00d124a7c024c',//澄迈双创子栏目第一个
            changjiang_wmsjActive:'5db00230e4b00d124a7c0262',//昌江文明实践子栏目第一个
            changjiang_tpgjActive:'5db0027ee4b00d124a7c026f',//昌江脱贫攻坚子栏目第一个
            changjiang_tswlActive:'5db002e2e4b00d124a7c0283',//昌江特色文旅子栏目第一个
            changjiang_cjscActive:'5db002b4e4b00d124a7c027a',//昌江双创子栏目第一个
            wenchang_wcgsActive:'5db0383ce4b00d124a7c02f7',//文昌文昌故事子栏目第一个
            childTabList: [],
            chuanchengList:[],
            wenmingList:[], //文昌 文明实践三级栏目
            longxiangList:[], //濮阳 龙乡新闻三级栏目
            shengshixiangList:[],
            lianganxiangList:[],
            zhuanlanList:[],
            shijianList:[],
            tuopinList:[],
            wenlvList:[],
            zhengfaList:[],
            wanning_wmsj:[],
            wanning_tpgj:[],
            wanning_wnsc:[],
            wanning_tswl:[],
            hangkong_tdgz:[],//航空客户端 热点关注 初始子栏目数组
            hangkong_gnll:[],//航空客户端 热点关注 初始子栏目数组
            hangkong_jsjs:[],//航空客户端 热点关注 初始子栏目数组
            hangkong_wqzb:[],//航空客户端 热点关注 初始子栏目数组
            hangkong_gfgy:[],//航空客户端 热点关注 初始子栏目数组
            hangkong_zlgh:[],//航空客户端 热点关注 初始子栏目数组
            afarmerList:[],
            lgWmsjList:[], //临高客户端特色文旅
            lgTpgjList:[],
            lgTswlList:[],
            lgLgscList:[],
            cmShijianList:[],//澄迈文明实践三级栏目数组
            cmTpgjList:[],//澄迈脱贫攻坚三级栏目数组
            cmTswlList:[],//澄迈特色文旅三级栏目数组
            cmCmscList:[],//澄迈双创三级栏目数组
            cjWmsjList:[],//昌江文明实践三级栏目数组
            cjTpgjList:[],//昌江文明实践三级栏目数组
            cjTswlList:[],//昌江特色文旅三级栏目数组
            cjCjscList:[],//昌江双创三级栏目数组
            wcwcgsList:[],//文昌客户端文昌故事
        }
    },
    computed: {
        ...mapGetters('index', [
            'indexActive',
            'activeIndex',
            'indexColumn'
        ])
    },
    watch: {
        indexActive() {
            this.slideTo()
        }
    },
    methods: {
        ...mapMutations('index', [
            'set_indexActive',
            'set_indexSwiper'
        ]),
        ...mapActions('index', [
            'TV_child_listItem_data',
            'lianghui_indexColumn_data',
            'chuangcheng_indexColumn_data',
            'wenming_indexColumn_data',
            'longxiang_child_listItem_data',
            'shenshi_child_listItem_data',
            'liangan_child_listItem_data',
            'zhuanlan_child_listItem_data',
            'afarmer_child_listItem_data',
            'shijian_child_listItem_data', //白沙文明实践三级栏目
            'tuopin_child_listItem_data', //白沙脱贫攻坚三级栏目
            'wenlv_child_listItem_data', //白沙特色文旅三级栏目
            'zhengfa_child_listItem_data', //白沙特色文旅三级栏目
            'wmsj_child_listItem_data', //万宁文明实践三级栏目
            'tpgj_child_listItem_data', //万宁脱贫攻坚三级栏目
            'wnsc_child_listItem_data', //万宁万宁双创三级栏目
            'tswl_child_listItem_data', //万宁特色文旅三级栏目
            'rdgz_child_listItem_data',//航空热点关注三级栏目
            'gnll_child_listItem_data',//航空概念理论三级栏目
            'jsjs_child_listItem_data',//航空军事技术三级栏目
            'wqzb_child_listItem_data',//航空武器装备三级栏目
            'gfgy_child_listItem_data',//航空国防工业三级栏目
            'zlgh_child_listItem_data',//航空战略规划三级栏目
            'lgwmsj_child_listItem_data',//临高文明实践三级栏目
            'lgtpgj_child_listItem_data',//临高脱贫攻坚三级栏目
            'lgtswl_child_listItem_data',//临高特色文旅三级栏目
            'lglgsc_child_listItem_data',//临高临高双创三级栏目
            'cmshijian_child_listItem_data',//澄迈文明实践三级栏目
            'cmtpgj_child_listItem_data',//澄迈脱贫攻坚三级栏目
            'cmtswl_child_listItem_data',//澄迈特色文旅三级栏目
            'cmsc_child_listItem_data',//澄迈特色文旅三级栏目
            'cjwmsj_child_listItem_data',//昌江文明实践三级栏目
            'cjtpgj_child_listItem_data',//昌江脱贫攻坚三级栏目
            'cjsc_child_listItem_data',//昌江双创三级栏目
            'cjtswl_child_listItem_data',//昌江特色文旅三级栏目
            'wcwcgs_child_listItem_data',//文昌文昌故事三级栏目
        ]),
        navClick(uuid){
         this.wenmingActive = uuid;
        },
        longxiangNavClick(uuid){
            this.longxinagActive = uuid;
        },
        newsNavClick(uuid){
            this.shegnshiActive = uuid;
        },
        afarmerClickslist(uuid){
            this.afarmerActive = uuid;
        },
        newsNavClickslist(uuid){
            this.zhuanlanActive = uuid;
        },
        shijianClickslist(uuid){
            this.shijianActive = uuid; 
        },
        tuopinClickslist(uuid){
            this.tuopinActive = uuid; 
        },
        wenlvClickslist(uuid){
            this.wenlvActive = uuid; 
        },
        zhengfaClickslist(uuid){
            this.zhengfaActive = uuid;
        },
        wanningWmsjClick(uuid){
            this.wanning_wmsjActive = uuid; 
        },
        wanningTpgjClick(uuid){
            this.wanning_tpgjActive = uuid; 
        },
        wanningWnscClick(uuid){
            this.wanning_wnscActive = uuid; 
        },
        wanningTswlClick(uuid){
            this.wanning_tswlActive = uuid; 
        },
        newsNavClicks(uuid){
            this.lianganActive = uuid;
        },
        lingaoWmsjClick(uuid){
            this.lingao_wmsjActive = uuid; 
        },
        lingaoTpgjClick(uuid){
            this.lingao_tpgjActive = uuid; 
        },
        lingaoTswlClick(uuid){
            this.lingao_tswlActive = uuid; 
        },
        lingaoLgscClick(uuid){
            this.lingao_lgscActive = uuid;
        },
        chengmaiShijianClick(uuid){
            this.chengmai_wmsjActive = uuid;
        },
        chengmaiTpgjClick(uuid){
            this.chengmai_tpgjActive = uuid;
        },
        chengmaiTswlClick(uuid){
            this.chengmai_tswlActive = uuid;
        },
        chengmaiCmscClick(uuid){
            this.chengmai_cmscActive = uuid;
        },
        chengmaiTswlClick(uuid){
            this.chengmai_tswlActive = uuid;
        },
        changjiangWmsjClick(uuid){
            this.changjiang_wmsjActive = uuid;
        },
        changjiangTpgjClick(uuid){
            this.changjiang_tpgjActive = uuid;
        },
        changjiangCjscClick(uuid){
            this.changjiang_cjscActive = uuid;
        },
        changjiangTswlClick(uuid){
            this.changjiang_tswlActive = uuid;
        },
        wenchangWcgsClick(uuid){
            this.wenchang_wcgsActive = uuid;
        },
        hangkongTdgzClick(uuid){
            this.hangkong_tdgzActive = uuid;
        },
        hangkongGnllClick(uuid){
            this.hangkong_gnllActive = uuid;
        },
        hangkongJsjsClick(uuid){
            this.hangkong_jsjsActive = uuid;
        },
        hangkongWqzbClick(uuid){
            this.hangkong_wqzbActive = uuid;
        },
        hangkongGfgyClick(uuid){
            this.hangkong_gfgyActive = uuid;
        },
        hangkongZlghClick(uuid){
            this.hangkong_zlghActive = uuid;
        },
        touch(oEvent){
           oEvent.cancelBubble = true;
        },
        touchmove(oEvent){
            $('.zhuanti').css({ 'overflow-x':'auto' });
            oEvent.cancelBubble = true;
        },
        slideTo() {
            this.$refs.mySwiper.swiper.slideTo(this.activeIndex, 300, true) // 让swiper滚动到index位置
        },
        slideChangeCallBack (swiper) {
            let index = swiper.activeIndex
            this.set_indexActive(this.indexColumn[index].classpath) // 滚动完swiper需要改变vuex里面的indexActive，这是为了与栏目联动
        },
        // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        slideMoveCallBack () {
            this.set_indexSwiper(true)
        },
        // 移动的时候设为true，这是为了移动时，不能下拉，我在mint-ui的loadmore代码里自定义了一个属性用于监听左右滑动，然后禁止loadmore组件的触发
        touchEndCallBack () {
            this.set_indexSwiper(false)
        }
    },
    mounted() {
        this.lianghui_indexColumn_data()
        .then(res => {
            var tempArr=[];
            res.forEach(function (item, i) {
                tempArr.push({
                    'classid': item.uuid,
                    'classname': item.name,
                })
            })
            this.lianghuiList = tempArr
        })
        .catch(err => {
            
        })
        //澄迈客户端三级栏目
        if( this.apis.getTheme() == 'chengmai' ){
            this.cmshijian_child_listItem_data()
            .then( res => {
                this.cmShijianList = res.data;
            })
            this.cmtpgj_child_listItem_data()
            .then( res => {
                this.cmTpgjList = res.data;
            })
            this.cmtswl_child_listItem_data()
            .then( res => {
                this.cmTswlList = res.data;
            })
            this.cmsc_child_listItem_data()
            .then( res => {
                this.cmCmscList = res.data;
            })
        }
        //昌江客户端三级栏目
        if( this.apis.getTheme() == 'changjiang' ){
            this.cjwmsj_child_listItem_data()
            .then( res => {
                this.cjWmsjList = res.data;
            })
            this.cjtpgj_child_listItem_data()
            .then( res => {
                this.cjTpgjList = res.data;
            })
            this.cjtswl_child_listItem_data()
            .then( res => {
                this.cjTswlList = res.data;
            })
            this.cjsc_child_listItem_data()
            .then( res => {
                this.cjCjscList = res.data;
            })
        }
        //临高客户端三级栏目
        if( this.apis.getTheme() == 'lingao' ){
            this.lgwmsj_child_listItem_data()
            .then(res => {
                this.lgWmsjList = res.data
            })
            this.lgtpgj_child_listItem_data()
            .then(res => {
                this.lgTpgjList = res.data
            })
            this.lgtswl_child_listItem_data()
            .then(res => {
                this.lgTswlList = res.data
            })
            this.lglgsc_child_listItem_data()
            .then(  res => {
                this.lgLgscList = res.data
            })
        }
        //航空客户端三级栏目
        if( this.apis.getTheme() == 'hangkong' ){
            this.rdgz_child_listItem_data()
            .then(res => {
                this.hangkong_tdgz = res.data
            })
            .catch(err => {
                
            })
            this.gnll_child_listItem_data()
            .then(res => {
                this.hangkong_gnll = res.data;
            })
            .catch(err => {
                
            })
            this.jsjs_child_listItem_data()
            .then(res => {
                this.hangkong_jsjs = res.data
            })
            .catch(err => {
                
            })
            this.wqzb_child_listItem_data()
            .then(res => {
                this.hangkong_wqzb = res.data
            })
            .catch(err => {
                
            })
            this.gfgy_child_listItem_data()
            .then(res => {
                this.hangkong_gfgy = res.data
            })
            .catch(err => {
                
            })
            this.zlgh_child_listItem_data()
            .then(res => {
                this.hangkong_zlgh = res.data
            })
            .catch(err => {
                
            })
        }
        //朝阳客户端三级栏目
        if( this.apis.getTheme() == 'chaoyang' ){
            this.TV_child_listItem_data()
            .then(res => {
                this.childTabList = res.data
            })
        }
        if( this.apis.getTheme() == 'qingtongxia' ){
            this.chuangcheng_indexColumn_data()
            .then(res => {
                this.chuanchengList = res.data
            })
            .catch(err => {
                
            })
        }
        if( this.apis.getTheme() == 'wenchang' ){
            this.wenming_indexColumn_data()
            .then(res => {
                this.wenmingList = res.data
            })
            .catch(err => {
                
            })
        }
        if( this.apis.getTheme() == 'puyang' ){
            this.longxiang_child_listItem_data()
            .then(res => {
                this.longxiangList = res.data
            })
            .catch(err => {
                
            });
           this.shenshi_child_listItem_data()
            .then(res => {
                this.shengshixiangList = res.data
            })
            .catch(err => {
                
            });
        }
        if( this.apis.getTheme() == 'haicang' ){
            this.liangan_child_listItem_data()
            .then(res => {
                this.lianganxiangList = res.data
            })
            .catch(err => {
            });
        }
        if( this.apis.getTheme() == 'dongpo' ){
            this.zhuanlan_child_listItem_data()
            .then(res => {
                this.zhuanlanList = res.data
            })
            .catch(err => {
                
            });
           this.afarmer_child_listItem_data()
            .then(res => {
                this.afarmerList = res.data
            })
            .catch(err => {
                
            });
          
        }
        if( this.apis.getTheme() == 'baisha' ){
            this.zhengfa_child_listItem_data()
            .then(res => {
                this.zhengfaList = res.data
            })
            .catch(err => {
                
            });
            this.shijian_child_listItem_data()
            .then(res => {
                this.shijianList = res.data
            })
            .catch(err => {
                
            });
            this.tuopin_child_listItem_data()
            .then(res => {
                this.tuopinList = res.data
            })
            .catch(err => {
                
            });
            this.wenlv_child_listItem_data()
            .then(res => {
                this.wenlvList = res.data
            })
            .catch(err => {
                
            });
        }
        if( this.apis.getTheme() == 'wanning' ){
            this.wmsj_child_listItem_data()
            .then(res => {
                this.wanning_wmsj = res.data
            })
            .catch(err => {
                
            });
            this.tpgj_child_listItem_data()
            .then(res => {
                this.wanning_tpgj = res.data
            })
            .catch(err => {
                
            });
            this.wnsc_child_listItem_data()
            .then(res => {
                this.wanning_wnsc = res.data
            })
            .catch(err => {
                
            });
            this.tswl_child_listItem_data()
            .then(res => {
                this.wanning_tswl = res.data
            })
            .catch(err => {
                
            });
        }
        
    }
}
</script>
<style lang='stylus' >
.swiper-box.isIOS {
    // padding-top: 2.83rem;
        padding-top: 1.335rem;
}
.swiper-box {
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #fff !important;
    padding-top: 2.295rem;
    padding-top: 1.85rem !important;
    .swiper-slide-box {
        padding-top: 0rem;
    }
}
.swiper-box-special .swiper-box {
    padding: 0 !important;
}
.listItem a[data-v-43c7437e] {
    display: block;
    width: 100%;
    padding: 0.427rem 0;
    outline: none;
    color: #131313;
    -webkit-tap-highlight-color: rgba(0,0,0,0.1);
    text-decoration: none;
}
.listItem h3{
    white-space: normal;
    font-size: 0.34rem;
    line-height: 0.48rem;
    color: #222;
    font-weight: 400;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 0.427rem 0;
}
// 看电视
.wenlv-child-tab .mint-tab-item-label {
    font-size: 16px;
}
.child-tab {
    .mint-tabbar > .mint-tab-item.is-selected {
        color: #333;
    }
    .listItem >div:first-child {
        margin-top: 10px;
    }
}
</style>
<style lang="less" scoped>
.mint-tabbar {
    // z-index: 1111;
    top: 0;
    bottom: auto;
    height: 94px;
    background: #fff;
    .wenlv-child-tab {
        padding: 66px 0 0 0;
        &:nth-child(1) {
            background: ~"url('../images/cyIcon.png') no-repeat center 12px / 40px";
        }
        &:nth-child(2) {
            background: ~"url('../images/ztIcon.png') no-repeat center 12px / 40px";
        }
        &:nth-child(3) {
            background: ~"url('../images/wsp1.png') no-repeat center 12px / 40px";
        }
        &.is-selected {
            &:nth-child(1) {
                background: ~"#f2f2f2 url('../images/cyIcon.png') no-repeat center 12px / 40px";
            }
            &:nth-child(2) {
                background: ~"#f2f2f2 url('../images/ztIcon.png') no-repeat center 12px / 40px";
            }
            &:nth-child(3) {
                background: ~"#f2f2f2 url('../images/wsp1.png') no-repeat center 12px / 40px";
            }
        }
    }
}
nav {
  position: relative;
  background-color: #f4f5f6;
  border-bottom: 1px solid #eee;
  padding-right: 1.06rem;
  .nav_ul {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    font-size: 0;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
    a {
      display: table-cell;
      *display: inline-block;
      vertical-align: middle;
      padding: 0 0.133rem; //0 0.267rem
      margin-left: 0.133rem;
      height: 0.68rem;
      line-height: 0.68rem;
      font-size: 0.34rem;
      color: #505050;
      white-space: nowrap;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
      position: relative;
      &:last-child {
        margin-right: 0.133rem;
      }
      &.active {
        color: @dominantColor;
        // font-weight: bold;
        span {
          border-bottom: 2px solid @dominantColor;
        }
      }
      span {
        position: absolute;
        top: 0;
        bottom: 2px;
        left: 20%;
        right: 20%;
      }
    }
  }
  .nav_menu {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    .shadow {
      position: absolute;
      width: 0.267rem;
      height: 100%;
      left: -0.267rem;
      background-size: contain;
      background-color: rgba(244, 245, 246, 0.3);
    }
    .more_btn {
      display: block;
      width: 1.06rem;
      height: 100%;
      background-size: 0.32rem;
      background-color: #f4f5f6;
    }
  }
}
.childNav {
  padding: 0;
  background: #fff;
  padding: 0.2rem 0;
  // padding-left: 0.5rem;
  .nav_ul {
    margin-bottom:.2rem;
    position: relative;
    left: .2rem;
    a {
      color: #828186;
      background: #f9f9fb;
      // margin: 0 0.2rem !important;
      display: inline-block;
      line-height: 0.55rem;
      border-radius: 3px;
      padding: 0 0.2rem;
      font-size: .3rem;
      height: .55rem;
      margin: 0 .1rem;
      &.active {
        color: #fff;
        background: @dominantColor;
      }
    }
  }
}
.mint-tab-container {
    // margin-top: 94px;
    .mint-tab-container-item {
        height: calc(100vh - 180px);
    }
}
// .lianghui {
//     width: 100%;
//     height: 100%;
//     padding: 10px 10px 0.5rem;
//     -webkit-overflow-scrolling: touch;
//     overflow-y: auto;
//     >div {
//         width: 100%;
//         height: 2.96rem;
//         margin-bottom: 10px;
//         &:nth-child(1) {
//             background: url('../../../../assets/img/qingtongxia/xbdnklh.jpg') no-repeat center / cover;
//         }
//         &:nth-child(2) {
//             background: url('../../../../assets/img/qingtongxia/lhjj.jpg') no-repeat center / cover;
//         }
//         &:nth-child(3) {
//             background: url('../../../../assets/img/qingtongxia/dhlh.jpg') no-repeat center / cover;
//         }
//         &:nth-child(4) {
//             background: url('../../../../assets/img/qingtongxia/lhqwfb.jpg') no-repeat center / cover;
//         }
//         >div {
//             width: 100%;
//             height: 100%;
//         }
//     }
// }
</style>

