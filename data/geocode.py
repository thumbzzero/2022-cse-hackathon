import googlemaps
import pandas

gmaps = googlemaps.Client(key='AIzaSyC0EMhcuI2GSgL3wPmmxFzGj50ugs-pABg')
geocode_result = gmaps.geocode(('경북대학교'), language='ko')


print(geocode_result)
latitude  = geocode_result[0]["geometry"]["location"]["lat"] # 리스트에서 위도 추출
longitude = geocode_result[0]["geometry"]["location"]["lng"] # 리스트에서 경도 추출

print(latitude, longitude)