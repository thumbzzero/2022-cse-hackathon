import pandas as pd
import googlemaps

gmaps = googlemaps.Client(key='AIzaSyC0EMhcuI2GSgL3wPmmxFzGj50ugs-pABg')

data = pd.read_csv("./북구.csv", encoding='cp949')
# data = pd.read_csv("./수성구.csv", encoding='cp949')

start_la = []
start_lo = []
end_la = []
end_lo = []



for i in range(len(data)):
    start = data.iloc[i,7]

    geocode_result1 = gmaps.geocode((start), language='ko')

    try:
        latitude1 = geocode_result1[0]["geometry"]["location"]["lat"]  # 리스트에서 위도 추출
        longitude1 = geocode_result1[0]["geometry"]["location"]["lng"]  # 리스트에서 경도 추출

    except:
        start_la.append("nan")
        start_lo.append("nan")

    else:
        start_la.append(latitude1)
        start_lo.append(longitude1)


for i in range(len(data)):
    end = data.iloc[i,8]

    geocode_result1 = gmaps.geocode((end), language='ko')

    try:
        latitude1 = geocode_result1[0]["geometry"]["location"]["lat"]  # 리스트에서 위도 추출
        longitude1 = geocode_result1[0]["geometry"]["location"]["lng"]  # 리스트에서 경도 추출

    except:
        end_la.append("nan")
        end_lo.append("nan")

    else:
        end_la.append(latitude1)
        end_lo.append(longitude1)

save_data = {'start_lat': start_la,
            'start_lng': start_lo,
             'end_lat': end_la,
             'end_lng': end_lo}

print("전환완료")
save_frame = pd.DataFrame(save_data)

# save_frame.to_csv('수성구-save.csv')
save_frame.to_csv('북구-save.csv')


