<?php
/**
*/
include_once("adb.php");
/**
*Users  class
*/
class users extends adb{

	function addUser($username,$firstname='none',$lastname='none',$password='none',$phone){
		$strQuery="insert into user set
						USERNAME='$username',
						FIRSTNAME='$firstname',
						LASTNAME='$lastname',
						PHONE='233$phone',
						PWORD='$password'";
		return $this->query($strQuery);				
	}

	function login($username,$password)
	{
		return $this->query("select USERNAME, uid,Lat,Lon,phone from user where USERNAME='$username' and PWORD='$password'");
	}
	
	function addPool($dest,$type,$capacity,$time,$user )
	{

		return $this->query("insert into car set
						CAR_TYPE='$type',
						DESTINATION='$dest',
						CAPACITY='$capacity',
						TIME='$time',
						DRIVER='$user'
						");	

	}

	function getAllPools()
	{
		return $this->query("select car.car_type,car.carId,car.driver, car.destination, car.time,car.capacity,user.firstname,car.isFull,user.lastname from car,user where user.uid= car.driver");
	}

	function updateCount($pid,$count)
	{
      return $this->query("Update car SET isFull = '$count' WHERE car.carId=$pid");
	}

	function joinPool($cid,$oid,$pid,$pay)
	{
        
		return $this->query("insert into join_car set car_id='$cid',owner='$oid',passenger='$pid',payment='$pay'");
	}

	function getPool($id)
	{
		return $this->query("select user.firstname,user.lastname, car.date_created ,join_car.payment, car.car_type from join_car, car,user where join_car.owner ='$id' and join_car.owner = user.uid and join_car.car_id=car.carId");
	}
    
    function updateLocation($id,$lat,$long)
    {
    	return $this->query("update user SET Lat = '$lat', Lon = '$long' WHERE user.uid = '$id'");
    }
    function createNews($message,$uid,$pic)
    {
        return $this->query("insert into news set content='$message',user='$uid',image='$pic'");
    }

	
}


?>




