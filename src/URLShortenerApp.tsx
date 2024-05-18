import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { IoAlertCircleOutline, IoLinkOutline } from "react-icons/io5"

interface FormValues {
  url: string;
}

const URLShortenerApp = () => {

  const { handleSubmit, register, formState:{ errors }} = useForm<FormValues>();
  const [shortenerUrl, setShortenerUrl] = useState('');

  const convertShortenerUrl = async( url: string ) => {
    const options = {
      method: 'POST',
      url: 'https://url-shortener42.p.rapidapi.com/shorten/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': `${import.meta.env.VITE_X_RapidAPI_Key}`,
        'X-RapidAPI-Host': `${import.meta.env.VITE_X_RapidAPI_Host}`
      },
      data: {
        url: `${url}`,
        validity_duration: 5
      }
    };

    const { data } = await axios.request(options);
    return data.url;
  }

  const onSubmit = async(data:FormValues) => {
    const { url } = data;
    try {
      await convertShortenerUrl(url).then( finalUrl => setShortenerUrl(finalUrl));
    } catch (error) {
      console.log({error});
    }
  }

  return (
    <main className="min-h-screen flex justify-center">
      <div className="flex justify-center container pt-5 fade-in">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold animate-pulse">URL SHORTENER APP</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 p-5 w-full rounded backdrop-blur-sm bg-white/30">
            <input type="text" {...register("url", { required: true })} placeholder="Insert your URL here" className="px-2 py-2 rounded shadow-md w-full text-slate-800" />
            
              { errors.url && (
                <div className="mt-2 bg-gray-300 p-2 rounded-lg shadow-md">
                  <span className="text-red-500 font-bold flex items-center"><IoAlertCircleOutline size={ 20 } className="mr-1"/> The URL is required </span>
                </div>
              )}
            
            <div className="flex justify-center mt-5">
              <button className="btn-primary flex items-center"><IoLinkOutline size={20} className="mr-1"/>Convert</button>
            </div>
          </form>

          <div className="p-2 mt-5">
            { shortenerUrl && (
              <p className="font-bold">Shortener URL Created: &nbsp; <a href={ shortenerUrl } target="_blank" className="hover:text-gray-400 font-normal">{ shortenerUrl }</a></p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default URLShortenerApp
