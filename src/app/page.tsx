"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";
import SingleFileDropzone from "@/components/singleFileDropzone";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [openAIResponse, setOpenAIResponse] = useState<string>("");

  function simulateUploadProgress() {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 2;
      });
    }, 100);
  }

  useEffect(() => {
    if (file) {
      simulateUploadProgress();
    }
  }, [file]);

  function handleFileChange(file: string) {
    setFile(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (file === "") {
      alert("Upload an image.");
      return;
    }
    setLoading(true);

    // POST api/upload
    await fetch("api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: file,
      }),
    }).then(async (response: any) => {
      const reader = response.body?.getReader();
      setOpenAIResponse("");
      let result = "";
      while (true) {
        const { done, value } = await reader?.read();
        // done is true once the response is done
        if (done) {
          break;
        }

        var currentChunk = new TextDecoder().decode(value);
        result += currentChunk;
      }

      const jsonResponse = JSON.parse(result);
      setOpenAIResponse(jsonResponse?.message);
      setLoading(false);
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <SingleFileDropzone
          width={200}
          height={200}
          value={file!}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 1,
          }}
          onChange={(file) => handleFileChange(file!)}
        />

        {/* Progress Bar */}
        {file && progress <= 99 ? (
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        ) : null}

        {progress >= 99 ? (
          <button
            onClick={(e: any) => handleSubmit(e)}
            disabled={loading}
            className={styles.button}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        ) : null}
      </div>

      {openAIResponse !== "" ? (
        <div className={styles.responseContainer}>
          <Image
            src={"/favicon.svg"}
            alt="AI Interviewer Icon"
            height={50}
            width={50}
          />
          <div className={styles.responseTextContainer}>
            <p className={styles.responseText}>{openAIResponse}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
