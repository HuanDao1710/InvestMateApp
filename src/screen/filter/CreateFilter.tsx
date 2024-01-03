import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {Text, TouchableOpacity, View} from 'react-native';
import IconSave from '../../iconSVG/IconSave';
import IconEdit from '../../iconSVG/IconEdit';
import IconLeft from '../../iconSVG/IconLeft';
import { ScrollView } from "react-native";


const CriteriaItem = () => {
    return(
        <TouchableOpacity style={{width: "90%", height: 70, borderBottomWidth: 1, borderColor: "#B0B0B0", justifyContent:"center"}}>
            <View style={{height: "30%"}}>
                <Text style={{color: "grey", fontSize: 12, fontWeight: "500"}}>Sàn giao dịch</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{color: "black", fontSize: 16, fontWeight: "500"}}>Tất cả các sàn giao dịch</Text>
                <IconLeft style={{width: 25, aspectRatio: 1}}/>
            </View>
        </TouchableOpacity>
    )
}

const CreateFilter = () => {
    const navigation = useNavigation<any>();
    const [numResult, setNumResult] = useState<number>(0);
    const [criteriaList, setCriteriaList] = useState<any[]>([1,2,3]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Sàng lọc cổ phiếu",
            headerTitleStyle: {fontSize: 18},
            headerRight: () => (
                <View style={{flexDirection: "row", }}>
                    <TouchableOpacity
                        style={{margin: 15,}}
                        onPress={()=>{}}>
                       <IconSave style={{height: 23, aspectRatio: 1}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{margin: 15}}
                        onPress={()=>{}}>
                        <IconEdit style={{height: 23, aspectRatio: 1}}/>
                    </TouchableOpacity> 
                </View>
            ),
            headerStyle: {
                borderBottomColor: '#F0F0F0', // Màu sắc của ranh giới
                borderBottomWidth: 1, // Độ dày của ranh giới
            },
        }
    );})


    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <View style={{width: "100%", height: 50, justifyContent:"center", alignItems: "center", elevation: 1, borderWidth: 1, borderColor: "#DFDFDF"}}>
                    <Text style={{color: "black", fontSize: 17, fontWeight: "600"}}>{numResult} Trùng Khớp</Text>
                </View>
                <View style={{width: "100%", height: 'auto', alignItems: "center"}}>
                    {criteriaList.map((item, index)=> <CriteriaItem key={index}/>)}
                    <TouchableOpacity style={{height: 40, width: "90%", borderWidth: 1, marginTop: 30, justifyContent: "center", alignItems: "center"}}
                        onPress={()=> navigation.navigate('CriteriaList')}>
                        <Text style={{color: "black",}}>
                            +Thêm tiêu chí
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 50}}/> 
            </ScrollView>
            <View style={{width: "100%", justifyContent: "center", alignItems: 'center', height: 50, bottom: 30, }}>
                <TouchableOpacity style={{width: "90%", height: 50,  justifyContent: "center", alignItems: 'center', backgroundColor: "#B8C4FF" , elevation: 1 }}>
                    <Text style={{color: "white", fontSize: 18, fontWeight: "500"}}>Hiển thị kết quả</Text>
                </TouchableOpacity> 
            </View>   
        </View>
    )
}
export default CreateFilter