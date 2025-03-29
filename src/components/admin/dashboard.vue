<template>
  <div class="container mt-4">
    <div class="row">
      
      <div class="col-md-6">
        <div class="chart-card">
          <h5 class="text-center">Tỉ lệ phòng được đặt</h5>
          <canvas ref="roomRateCanvas" width="300" height="300"></canvas>
          <div class="legend">
            <span class="legend-item">
              <span class="legend-dot" style="background-color: #3498db;"></span> Đã đặt
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background-color: #bdc3c7;"></span> Còn trống
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="chart-card">
          <h5 class="text-center">Tỉ lệ đơn hàng</h5>
          <canvas ref="orderRateCanvas" width="300" height="300"></canvas>
          <div class="legend">
            <span class="legend-item">
              <span class="legend-dot" style="background-color: #2ecc71;"></span> Hoàn thành
            </span>
            <span class="legend-item">
              <span class="legend-dot" style="background-color: red;"></span> Hủy
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="chart-card">
          <h5 class="text-center">Doanh thu theo tháng</h5>
          <canvas ref="revenueCanvas" width="600" height="300"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const roomRateCanvas = ref(null);
    const orderRateCanvas = ref(null);
    const revenueCanvas = ref(null);

    const drawDoughnutChart = (canvas, data, colors) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const total = data.reduce((a, b) => a + b, 0);
      let startAngle = -0.5 * Math.PI;
      
      data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        startAngle += sliceAngle;
      });
    };

    const drawBarChart = (canvas, data, labels, color) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxValue = Math.max(...data);
      const barWidth = 40;
      const spacing = 20;
      const chartHeight = 250;
      const paddingLeft = 50;
      const minBarHeight = 10;
      const scaleFactor = 0.2;
      
      labels.forEach((label, index) => {
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(label, index * (barWidth + spacing) + paddingLeft + barWidth / 2, 290);
      });

      data.forEach((value, index) => {
        if (value > 0) {
          const barHeight = Math.max((value / maxValue) * chartHeight * scaleFactor, minBarHeight);
          const x = index * (barWidth + spacing) + paddingLeft;
          const y = 300 - barHeight;
          
          ctx.fillStyle = color;
          ctx.fillRect(x, y, barWidth, barHeight);
          
          ctx.fillStyle = "#000";
          ctx.fillText(`${value.toLocaleString()} VNĐ`, x + barWidth / 2, y - 5);
        }
      });
    };

    onMounted(() => {
      drawDoughnutChart(roomRateCanvas.value, [50, 50], ["#3498db", "#bdc3c7"]);
      drawDoughnutChart(orderRateCanvas.value, [100], ["#2ecc71"]);
      drawBarChart(
        revenueCanvas.value,
        [0, 0, 350000, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
        "#f1c40f"
      );
    });

    return { roomRateCanvas, orderRateCanvas, revenueCanvas };
  }
});
</script>

<style scoped>
.container {
  max-width: 900px;
}

.chart-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.legend {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
</style>