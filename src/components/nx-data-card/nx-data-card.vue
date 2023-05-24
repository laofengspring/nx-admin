<template>
  <div class="data-card">
    <el-row :span="24">
      <el-col :span="span" v-for="(item, index) in this.option.data" :key="index">
        <div class="item">
          <img :src="item.icon" class="item-img" />
          <div
            class="item-text"
            :style="{ color: colorText, backgroundColor: bgText }"
          >
            <h3>{{ item.name + "-" + item.class + " " + item.role }}</h3>
            <p>{{ item.story }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "nx-data-card",
  data() {
    return {
      span: this.option.span || 6,
      data: this.option.data,
      colorText: this.option.colorText || "#fff",
      bgText: this.option.bgText || "#2e323f",
      borderColor: this.option.borderColor || "#2e323f"
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {},
  watch: {},
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
