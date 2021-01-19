import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const Search = () => {
  const [dataApi, setdataApi] = useState([]);
  const [text, setText] = useState("");
  
  useEffect(() => {
    const getData = async () => {
      //   const url =
      //     "https://cors-anywhere.herokuapp.com/https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=1";
      const { data } = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=100"
      );
      //   console.log(data[0]);
      setdataApi(data);
    };
    getData();
  }, []);

  function handleText(e) {
    setText(e.target.value);
    // console.log(text);
    // console.log(dataApi);
    // const searchRes = dataApi.filter(f=>f.animal_bodytype===text);
    // console.log(searchRes);
    // setdataApi(searchRes)
  }

  function handleSubmit(e) {
    e.preventDefault();

    // let dataArr = []
    // dataApi.map((t)=>{
    //     dataArr.push(t.animal_id)
    // }
    // )
    console.log(dataApi);
    const searchRes = dataApi.filter(f=>f.animal_bodytype===text);
    console.log(searchRes);
    setdataApi(searchRes)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
          {/* <TextField select ></TextField> */}
        <TextField onChange={handleText} value={text}
          variant="outlined"
          style={{ width: "500px", padding: "20px" }} placeholder="請輸入動物種類"
        />
        <Button type="submit" variant="contained" size="small" style={{height:"50px"}}>search</Button>
      </form>
      <Grid container spacing={5}>
        {dataApi.map((d) => (
          <Grid item xs={12} sm={6} lg={3}>
            <Card>
              <CardMedia
                alt="image"
                //   component="img"
                image={d.album_file}
                style={{
                  maxwidth: "100%",
                  height: "500px",
                  backgroundSize: "contain",
                }}
              />
              <CardContent>
                <Typography variant="h4">編號：{d.animal_id}</Typography>
                <Typography variant="h5">種類：{d.animal_kind}</Typography>
                <br />
                性別：{d.animal_sex}
                <br />
                花色：{d.animal_colour}
                <br />
                所在機構：{d.animal_place}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
