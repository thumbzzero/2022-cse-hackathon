package com.example.banktreeserver.naverapi;


import com.example.banktreeserver.entity.Banktree;
import com.example.banktreeserver.repository.BanktreeRepository;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NaverApi {

    @Value("${CLIENT_ID}")
    String clientID;
    @Value("${CLIENT_SECRET}")
    String clientSecret;

    @Autowired
    BanktreeRepository banktreeRepository;

    public void findBankPath() {
        List<Banktree> rootlist = banktreeRepository.findAll();
     //   System.out.println("size()"+rootlist.size());

        for( Banktree tree : rootlist) { //api 던지기
            float[][] root = new float[][]{{tree.getStartX(), tree.getStartY()}, {tree.getGoalX(), tree.getGoalY()}};

            String apiURL = "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=+" +
                    root[0][1] + "," + root[0][0] +
                    "+&goal=" + root[1][1] + "," + root[1][0];


            Map<String, String> requestHeaders = new HashMap<>();

            requestHeaders.put("X-NCP-APIGW-API-KEY-ID", clientID);
            requestHeaders.put("X-NCP-APIGW-API-KEY", clientSecret);

            String responseBody = get(apiURL, requestHeaders);

            tree.setId(tree.getId());


        }//모든 트리 경로설정완료
    }

    private String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);

        try{
            con.setRequestMethod("GET");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()){
                con.setRequestProperty(header.getKey(), header.getValue());
            }
            int responcseCode = con.getResponseCode();
            if(responcseCode==HttpURLConnection.HTTP_OK){
                return readBody(con.getInputStream());
            }else{
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 실패했습니다.",e);
        }finally{
            con.disconnect();
        }
    }

    private String readBody(InputStream body) {
        InputStreamReader sr = new InputStreamReader(body, StandardCharsets.UTF_8);
        try(
                BufferedReader br = new BufferedReader(sr)
        ){
            StringBuilder responseBody = new StringBuilder();
            String line;

            while((line = br.readLine())!=null){
                responseBody.append(line);
            }
            return responseBody.toString();
        }catch (IOException e){
            throw new RuntimeException("API 실패했습니다.",e);
        }
    }


    private HttpURLConnection connect(String apiUrl){
        try{
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("API 실패했습니다.",e);
        } catch (MalformedURLException e) {
            throw new RuntimeException("API 실패했습니다.",e);
        } catch (IOException e) {
            throw new RuntimeException("API 실패했습니다.",e);
        }
    }

}
