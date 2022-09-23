package com.example.banktreeserver.kakaoapi;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.*;
import org.springframework.beans.factory.annotation.Value;
import java.util.ArrayList;

@Component
public class KakaoApi {
    @Value("${GEOCODE_URL}")
    String url;
    @Value("${GEOCODE_KEY}")
    String user_info;
    //발급받은 API key Secret 변수처리
    public float [] givenLocationreturnLanLon(String address) throws ParseException {
            String jsonString = null;
            float [] coordi;
            try {
                //인코딩한 String을 넘겨야 원하는 데이터를 받을 수 있다.
                address = URLEncoder.encode(address, "UTF-8");

                String addr = url + address;
                URL url = new URL(addr);

                URLConnection con = url.openConnection();
                con.setRequestProperty("Authorization", "KakaoAK " + user_info);

                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));

                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                jsonString = response.toString();
                in.close();

                //response test
                System.out.println(response.toString());

            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            coordi = changeToJSON(jsonString);
        return coordi;
    }
    private float[] changeToJSON(String jsonString) throws ParseException {

        JSONParser parser = new JSONParser();
        JSONObject document = (JSONObject)parser.parse(jsonString);
        JSONArray jsonArray = (JSONArray) document.get("documents");
        JSONObject position = (JSONObject)jsonArray.get(0);
        float x = Float.parseFloat((String) position.get("x"));
        float y = Float.parseFloat((String) position.get("y"));

        return new float[]{x,y};
    }
}