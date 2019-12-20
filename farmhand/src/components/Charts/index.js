import React, { Component } from "react";
import PropTypes from "prop-types";
import Dataset from "react-rainbow-components/components/Dataset";
import ChartCard from "./chartCard";
import "./styles.css";

export default class Charts extends Component {
  render() {
    return (
      <div className="react-rainbow-admin-charts_container">
        <div>
          <section className="react-rainbow-admin-charts_section rainbow-p-top_large">
            <ChartCard
              title="Soil Moisture"
              chartTitle="Soil moisture in plants throughout the day"
              chartLabels={[
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00"
              ]}
              chartType="line"
              maintainAspectRatio={false}
              type="line"
              className="react-rainbow-admin-charts_chart-card"
              chartClassName="react-rainbow-admin-charts_chart"
            >
              <Dataset
                title="Plant 1"
                values={[
                  11.45,
                  14.64,
                  13.32,
                  12.56,
                  14.79,
                  13.29,
                  12.06,
                  14.04,
                  13.12,
                  12.65
                ]}
                borderColor="#fe4849"
                backgroundColor="#fe4849"
              />
              <Dataset
                title="Plant 2"
                values={[
                  10.23,
                  14.35,
                  12.8,
                  11.35,
                  14.06,
                  12.59,
                  11.02,
                  14.9,
                  13.24,
                  11.53
                ]}
                borderColor="#01b6f5"
                backgroundColor="#01b6f5"
              />
            </ChartCard>
            <section className="react-rainbow-admin-charts_section rainbow-p-top_large">
              <ChartCard
                title="Temperature"
                chartTitle="Temperature throughout the day"
                chartLabels={[
                  "09:00",
                  "10:00",
                  "11:00",
                  "12:00",
                  "13:00",
                  "14:00",
                  "15:00",
                  "16:00",
                  "17:00",
                  "18:00"
                ]}
                chartType="line"
                maintainAspectRatio={false}
                type="line"
                className="react-rainbow-admin-charts_chart-card"
                chartClassName="react-rainbow-admin-charts_chart"
              >
                <Dataset
                  title="Temperature"
                  values={[
                    32,
                    30,
                    31,
                    33,
                    32.5,
                    32.23,
                    30.65,
                    29.5,
                    28.9,
                    28.2
                  ]}
                  borderColor="#01b6f5"
                  backgroundColor="#01b6f5"
                />
              </ChartCard>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

Charts.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lineCharts: PropTypes.object.isRequired
};
