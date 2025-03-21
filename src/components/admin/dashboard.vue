<template>
  <div>
        <div class="content">
          <div class="chart-container">
            <!-- Khung 1: Biểu đồ tổng số cá Koi -->
            <div class="chart-box">
              <h3 class="chart-title">Tổng số cá Koi đăng kí</h3>
              <div class="chart-box-inner">
                <div class="chart-content">
                  <div class="chart-legend">
                    <p><span class="legend-color" style="background-color: #1E90FF;"></span> Số lượng cá Koi đã duyệt: {{  koiData.approved }}%</p>
                    <p><span class="legend-color" style="background-color: #FF6347;"></span> Số lượng cá Koi chưa duyệt: {{ koiData.pending }}%</p>
                  </div>
                  <canvas ref="koiChart"></canvas>
                </div>
              </div>
            </div>

            <!-- Khung 2: Biểu đồ tổng số người dùng đăng kí cuộc thi -->
            <div class="chart-box">
              <h3 class="chart-title">Tổng số người dùng đăng kí cuộc thi</h3>
              <div class="chart-box-inner">
                <div class="chart-content">
                  <div class="chart-legend">
                    <p><span class="legend-color" style="background-color: #1E90FF;"></span> Số lượng người dự thi chưa duyệt: 50%</p>
                    <p><span class="legend-color" style="background-color: #FF6347;"></span> Số lượng người đã duyệt: 50%</p>
                  </div>
                  <canvas ref="userChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Khung 3: Biểu đồ tổng số các cuộc thi -->
          <div class="chart-box full-width">
            <h3 class="chart-title">Tổng số các cuộc thi</h3>
            <div class="chart-box-inner">
              <div class="chart-legend-horizontal">
                <p><span class="legend-color" style="background-color: #1E90FF;"></span> Đang diễn ra</p>
                <p><span class="legend-color" style="background-color: #32CD32;"></span> Đã diễn ra</p>
                <p><span class="legend-color" style="background-color: #FFD700;"></span> Chưa diễn ra</p>
              </div>
              <canvas ref="competitionChart"></canvas>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { axiosPrivate } from '@/api/axios.js';

// Đăng ký các thành phần biểu đồ
Chart.register(...registerables);

export default {
  name: 'dashboard',
  components: {
  },
  data() {
    return {
      koiData:[],
      userData: {
        approved: 50,
        pending: 50,
      },
      competitionData: {
        ongoing: 5,
        finished: 3,
        upcoming: 2,
      },
    };
  },
  mounted() {
  },
  methods: {

    },
};
</script>

<style scoped>
.main-container {
  display: flex;
}

.header-content-container {
  flex-grow: 1;
  margin-left: 60px;
  transition: margin-left 0.3s;
}

.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.chart-box {
  width: 48%;
  margin-bottom: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}

.full-width {
  width: 100%;
}

.chart-title {
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  font-size: 40px;
}

.chart-box-inner {
  padding: 20px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}

.chart-legend p {
  margin: 0;
  font-size: 16px;
}

.legend-color {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.chart-legend-horizontal {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.chart-legend-horizontal p {
  margin: 0 20px;
  font-size: 16px;
}

canvas {
  max-width: 300px;
  max-height: 300px;
}
</style>
