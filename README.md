# K6-Loadtesting-tool
k6 is an open-source load testing tool designed for writing and running performance tests, especially targeting applications, APIs, and microservices.

### loadtest1
Single User Behavior: This script simulates a single virtual user that repeatedly makes HTTP requests to the URL with a 1-second pause between each request.

### Loadtest2

**Custom Metric (myTrend)**:
A Trend metric is created to track the response time of each request (res.timings.duration).

**Virtual Users:**
The load test runs in 3 stages:
- Stage 1: Ramp up to 20 virtual users over 30 seconds.
- Stage 2: Hold steady at 20 virtual users for 1 minute.
- Stage 3: Ramp down to 0 virtual users over 10 seconds.

**Thresholds:**
- http_req_duration:Ensures that 85% of HTTP requests take less than 500ms.
- my_trend: Ensures that the average response time tracked by my_trend is less than 300ms.

**HTTP Request:**
- The test sends an HTTP GET request to https://test.k6.io and checks if the response status is 200 (status is 200).
- The response time (res.timings.duration) is recorded and added to myTrend.

### Integrating K6 with InfluxDB or Prometheus and Grafana

- K6 collects performance metrics.
- InfluxDB or Prometheus stores the metrics.
- Grafana visualizes the metrics.

1. Set Up InfluxDB

Run InfluxDB (Docker):
```
docker run --name=influxdb -p 8086:8086 -v influxdb:/var/lib/influxdb -d influxdb:latest
```
Create Database:
```
influx
CREATE DATABASE k6
```

2. Set Up Prometheus

Run Prometheus (Docker):
```
docker run -d -p 9090:9090 --name=prometheus prom/prometheus
```

Run Push Gateway (Docker):
```
docker run -d -p 9091:9091 --name=pushgateway prom/pushgateway
```
Prometheus Scraping Config (prometheus.yml):
```
scrape_configs:
  - job_name: 'k6'
    static_configs:
      - targets: ['pushgateway:9091']
```
3. Set Up Grafana

Run Grafana (Docker):

```
docker run -d -p 3000:3000 --name=grafana grafana/grafana
```

Add Prometheus/InfluxDB Data Source:

- For Prometheus: http://localhost:9090
- For InfluxDB: http://localhost:8086/k6

4. K6 Configuration

Prometheus Output:

```
k6 run --out prometheus=http://localhost:9091/metrics script.js
```

InfluxDB Output:

```
k6 run --out influxdb=http://localhost:8086/k6 script.js
```

5. Visualize in Grafana

Create a Grafana dashboard to visualize K6 metrics like request durations and response times.

