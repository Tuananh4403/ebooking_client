<template>
  <div class="main-container">
    <div class="header-content-container">
      <div class="content">
        <!-- 💰 Revenue Summary -->
        <h2 class="section-title">Revenue Summary</h2>
        <div class="revenue-cards">
          <div class="revenue-card" v-for="(value, label) in revenueData" :key="label">
            <h3>{{ label }}</h3>
            <p>{{ formatCurrency(value) }}</p>
          </div>
        </div>

        <!-- 📊 Analytics Charts -->
        <h2 class="section-title">Analytics Overview</h2>
        <div class="chart-container">
          <!-- User Status -->
          <div class="chart-box">
            <h3 class="chart-title">User Status</h3>
            <div class="chart-box-inner">
              <canvas id="userStatusChart"></canvas>
            </div>
          </div>

          <!-- Booking Status -->
          <div class="chart-box">
            <h3 class="chart-title">Booking Status</h3>
            <div class="chart-box-inner">
              <canvas id="bookingStatusChart"></canvas>
            </div>
          </div>

          <!-- Pet Status -->
          <div class="chart-box">
            <h3 class="chart-title">Pet Status</h3>
            <div class="chart-box-inner">
              <canvas id="petStatusChart"></canvas>
            </div>
          </div>

          <!-- Combined Chart -->
          <div class="chart-box full-width">
            <h3 class="chart-title">Bookings & Revenue Over Time</h3>
            <div class="chart-box-inner">
              <canvas id="combinedChart"></canvas>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { bookingApiPrivate, customerApiPrivate } from "../../api/axios.js";

export default {
  name: 'dashboard',
  data() {
    return {
      revenueData: {},
      userData: {},
      bookingData: {},
      petData: {},
      combinedData: {
        labels: [],
        bookings: [],
        revenue: [],
      },
    };
  },
  async mounted() {
    try {
      const [bookingRes, walletRes, customerRes] = await Promise.all([
        bookingApiPrivate.get("/api/Booking/dashboard?api-version=1.0"),
        bookingApiPrivate.get("/api/Wallet/dashboard?api-version=1.0"),
        customerApiPrivate.get("/api/Customer/dashboard?api-version=1.0"),
      ]);

      this.mapDashboardData({
        booking: bookingRes.data.data,
        wallet: walletRes.data.data,
        customer: customerRes.data.data,
      });

      this.renderUserStatusChart();
      this.renderBookingStatusChart();
      this.renderPetStatusChart();
      this.renderCombinedChart();
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
    },
    mapDashboardData({ booking, wallet, customer }) {
      // 💰 Revenue
      this.revenueData = {
        "Total Deposits": wallet.totalDeposits,
        "Total Withdrawals": wallet.totalWithdrawals,
        "Total Refunds": wallet.totalRefunds,
        "Wallet Balance": wallet.totalWalletBalance,
      };

      // 👤 User stats
      this.userData = {
        approved: customer.approved,
        pending: customer.pending,
      };

      // 📦 Booking status (mapped from bookingDto)
      this.bookingData = {
        checkedIn: booking.inProgress,
        checkedOut: booking.completed,
        upcoming: booking.confirmed + booking.pending,
      };

      // 🐾 Pets
      this.petData = {
        total: customer.totalPets,
        inHomestay: customer.petsInHomestay,
        awaitingCheckIn: customer.petsAwaitingCheckIn,
      };

      // 📊 Combined Chart (Daily checkins & revenue)
      this.combinedData.labels = Object.keys(booking.dailyCheckins);
      this.combinedData.bookings = Object.values(booking.dailyCheckins);
      this.combinedData.revenue = this.combinedData.bookings.map(b => b * 400000); // approx revenue
    },
    renderUserStatusChart() {
      new Chart(document.getElementById('userStatusChart'), {
        type: 'doughnut',
        data: {
          labels: ['Approved', 'Pending'],
          datasets: [{
            data: [this.userData.approved, this.userData.pending],
            backgroundColor: ['#4caf50', '#ffc107'],
          }],
        },
        options: {responsive: true, plugins: {legend: {position: 'bottom'}}},
      });
    },

    renderBookingStatusChart() {
      new Chart(document.getElementById('bookingStatusChart'), {
        type: 'bar',
        data: {
          labels: ['Checked-in', 'Checked-out', 'Upcoming'],
          datasets: [{
            label: 'Bookings',
            data: [
              this.bookingData.checkedIn,
              this.bookingData.checkedOut,
              this.bookingData.upcoming,
            ],
            backgroundColor: ['#2196f3', '#9c27b0', '#ff9800'],
          }],
        },
        options: {
          responsive: true,
          scales: {y: {beginAtZero: true}},
        },
      });
    },

    renderPetStatusChart() {
      new Chart(document.getElementById('petStatusChart'), {
        type: 'pie',
        data: {
          labels: ['In Homestay', 'Awaiting Check-In', 'Other'],
          datasets: [{
            data: [
              this.petData.inHomestay,
              this.petData.awaitingCheckIn,
              this.petData.total - this.petData.inHomestay - this.petData.awaitingCheckIn,
            ],
            backgroundColor: ['#03a9f4', '#ff5722', '#e0e0e0'],
          }],
        },
        options: {responsive: true, plugins: {legend: {position: 'right'}}},
      });
    },

    renderCombinedChart() {
      new Chart(document.getElementById('combinedChart'), {
        type: 'bar',
        data: {
          labels: this.combinedData.labels,
          datasets: [
            {
              label: 'Bookings',
              data: this.combinedData.bookings,
              backgroundColor: '#2196f3',
              yAxisID: 'y',
            },
            {
              label: 'Revenue (VND)',
              data: this.combinedData.revenue,
              backgroundColor: '#4caf50',
              yAxisID: 'y1',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {display: true, text: 'Bookings'},
            },
            y1: {
              beginAtZero: true,
              position: 'right',
              title: {display: true, text: 'Revenue (VND)'},
              ticks: {
                callback: (value) =>
                    new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(value),
              },
              grid: {drawOnChartArea: false},
            },
          },
          plugins: {legend: {position: 'bottom'}},
        },
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header-content-container {
  flex-grow: 1;
  margin-left: 60px;
  transition: margin-left 0.3s;
}

.content {
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 24px;
  color: #333;
  margin: 20px 0 10px;
  font-weight: 600;
  border-left: 4px solid #4caf50;
  padding-left: 12px;
}

.revenue-cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 30px;
  gap: 20px;
}

.revenue-card {
  flex: 1 1 calc(25% - 20px);
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: transform 0.2s ease;
}

.revenue-card:hover {
  transform: translateY(-5px);
}

.revenue-card h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
  text-transform: uppercase;
  font-weight: 500;
}

.revenue-card p {
  font-size: 24px;
  color: #2e7d32;
  font-weight: bold;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.chart-box {
  flex: 1 1 48%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.chart-box.full-width {
  flex: 1 1 100%;
}

.chart-title {
  font-size: 18px;
  font-weight: 600;
  color: #444;
  padding: 15px 20px 0;
}

.chart-box-inner {
  padding: 10px 20px 20px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>
