import { output, speechToText } from "../../speech-to-text";

class GetAndTranscribeMp3AudioController {
  async store(req, res)  {
    const file = req;
    console.log(file);

    // await speechToText()
    // output();
    return res.status(200);

  }
}

export { GetAndTranscribeMp3AudioController };