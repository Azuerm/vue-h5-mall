<template>
  <div class="address">
    <van-nav-bar fixed title="配送地址" left-arrow @click-left="$router.go(-1)" />
    <div class="select">
      <van-address-edit :area-list="areaList" show-postal show-delete show-set-default show-search-result
        :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
        @delete="onDelete" @change-detail="onChangeDetail" />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getCity } from '@/api/address'
export default {
  data() {
    return {
      areaList: {},
      searchResult: []
    }
  },
  created() {
    this.getCityList()
  },
  methods: {
    onSave() {
      Toast('save')
    },
    onDelete() {
      Toast('delete')
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '',
            address: '',
          },
        ];
      } else {
        this.searchResult = []
      }
    },
    async getCityList() {
      const { data } = await getCity()
      console.log(data.list);
      
      console.log(JSON.stringify(data.list['1925']))
      
      function transformToVantFormat(data) {
        const result = {
          province_list: {},
          city_list: {},
          county_list: {}
        }
        // 处理省份
        for (const provinceId in data.list) {
          const province = data.list[provinceId];
          result.province_list[province.id] = province.name;
          // 处理城市
          if (province.city) {
            for (const cityId in province.city) {
              const city = province.city[cityId];
              result.city_list[city.id] = city.name;
              // 处理区县
              if (city.region) {
                for (const districtId in city.region) {
                  const district = city.region[districtId];
                  result.county_list[district.id] = district.name;
                }
              }
            }
          }
        }
        return result;
      }
      const vantData = transformToVantFormat(data);
      console.log(vantData);
      this.areaList = vantData
    }
  }
}
</script>s

<style scoped lang="less">
.select {
  margin-top: 40px;
}
</style>