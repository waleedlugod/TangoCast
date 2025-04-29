import { useParams } from "react-router-dom";
import "./Analytics.css";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Analytics() {
  const { authTokens, user } = useContext(AuthContext);

  const {
    data: podcasts,
    isLoading: isLoadingPodcasts,
    isError: isErrorPodcasts,
  } = useQuery({
    queryKey: ["analytics", user],
    queryFn: () => {
      return axios.get(
        `http://localhost:8000/podcast/?creator=${user.user.id}&ordering=-views`
      );
    },
    select: (data) => {
      data = data.data;
      data.total_views = data.reduce(
        (partialSum, podcast) => (partialSum += podcast.views),
        0
      );
      data.total_earnings = data.reduce(
        (partialSum, podcast) => (partialSum += podcast.earnings),
        0
      );
      return data;
    },
  });

  const {
    data: followers,
    isLoading: isLoadingFollowers,
    isError: isErrorFollowers,
  } = useQuery({
    queryKey: ["getFollowers"],
    queryFn: () => {
      return axios.get("http://localhost:8000/creators/get_followers", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
    },
    select: (data) =>
      (data = data.data.reduce((followers) => followers + 1, 0)),
  });

  return (
    <main>
      {isLoadingPodcasts ? (
        <p>Loading...</p>
      ) : isErrorPodcasts ? (
        <p>Error loading podcasts.</p>
      ) : (
        <div className="main-container">
          <div className="main-container__title">
            <h1>Channel Analytics</h1>
          </div>
          <div className="main-container__data">
            <div className="data__top">
              <div className="data__followers">
                <p>Followers</p>
                <p>{followers}</p>
              </div>
              <div className="data__views">
                <p>Views</p>
                <p>{podcasts.total_views}</p>
              </div>
            </div>
            <div className="data__bot">
              <p>Earnings</p>
              <p>PHP {podcasts.total_earnings}</p>
            </div>
          </div>
          <div className="top-podcasts">
            <p className="top-podcasts__title">Top Podcasts</p>
            <div>
              {podcasts?.map((podcast, index) => (
                <div className="podcast-card" key={podcast.id}>
                  <div className="podcast-card__left">
                    <p className="podcast-card__number">{index + 1}.</p>
                    <div className="podcast-card__mid">
                      <img
                        src={podcast.thumbnail}
                        alt={`${podcast.title} thumbnail`}
                      />
                      <div className="podcast-card__info">
                        <p className="podcast-card__title">{podcast.title}</p>
                        <p className="podcast-card__episode">
                          {podcast.episode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="podcast-card__right">
                    <p>{podcast.views} Views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
