<?php
include_once('users.php');
$obj = new users();
if ($_REQUEST['cmd']!=null)
{

    $cmd=$_REQUEST['cmd'];
    if ($cmd==1)
    {   
        $password=$_REQUEST['password'];
        $username=$_REQUEST['username'];
        $result=$obj->login($username,$password);
        $num=$obj->fetch();
        if($num==null){
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            header('Content-Type:application/json');
            echo json_encode($num);
        }
    }
    else if($cmd==2)
    {   
        if($_REQUEST['password']!=null && $_REQUEST['username']!=null){
            $password=$_REQUEST['password'];
            $username=$_REQUEST['username'];
            $firstname=$_REQUEST['fname'];
            $lastname=$_REQUEST['lname'];
            $phone=$_REQUEST['phone'];
            $result=$obj->addUser($username,$firstname,$lastname,$password,$phone);
            if ($result==0)
            {
                header('Content-Type:application/json');
                echo "false";
            }
            else
            {
                header('Content-Type:application/json');
                echo "true";
            }
        }
        else
        {
            header('Content-Type:application/json');
            echo "false"; 
        }
    }
    else if($cmd==3)
    {   
        //create Pool
        if($_REQUEST['type']!=null){
            $type=$_REQUEST['type'];
            $dest=$_REQUEST['dest'];
            $time=$_REQUEST['time'];
            $username=$_REQUEST['username'];
            $capacity=$_REQUEST['capacity'];
            $result=$obj->addPool($dest,$type,$capacity,$time,$username);
            if ($result==0)
            {
                header('Content-Type:application/json');
                echo "false";
            }
            else
            {
                header('Content-Type:application/json');
                echo "true";
            }
        }
        else
        {
            header('Content-Type:application/json');
            echo "false"; 
        }
    }
    else if ($cmd==4)
    {   
        $result=$obj->getAllPools();
        $num=$obj->fetch();
        $pool = new users();
        $result=$pool->getAllPools();
        if($num==null){
            header('Content-Type:application/json');
            echo '{"message":"false"}';
        }
        else
        {
            header('Content-Type:application/json');
            $array=array(); 
            while($one=$pool->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }
    }
    else if ($cmd==5)
    {   
        $number = $_REQUEST['phone'];
        $cid=$_REQUEST['cid'];
        $oid=$_REQUEST['oid'];
        $pid=$_REQUEST['pid'];
        $pay=$_REQUEST['pay'];
        $count=$_REQUEST['count'];
        $cap=$_REQUEST['cap']; 
        if($count==$cap)
        {
            $sender='KCars';
            $smsmessage='Your pool is full';
            $smsmessage= str_replace(' ','%20',$smsmessage);
            $ch = curl_init("http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to=233247858740&from=$sender&smsc=smsc&text=$smsmessage");
            curl_exec($ch);
            echo '{"result":0,"message":"Sorry This Pool is Full"}'; 
            return;
        }
        $count= $count+1;
        $pool = new users();
        $result=$obj->joinPool($cid,$oid,$pid,$pay);
        if ($result==0)
        {
            header('Content-Type:application/json');
            echo '{"result":0,"message":"Sorry You Could Not Be Added To This Pool"}';
        }
        else
        { 
            $sender='KCars';
            $smsmessage='Your have successfully joined the pool.Amount to pay:'.$pay;
            $smsmessage= str_replace(' ','%20',$smsmessage);
            $ch = curl_init("http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to=233247858740&from=$sender&smsc=smsc&text=$smsmessage");
            curl_exec($ch);
            $re=$pool->updateCount($cid,$count);
            header('Content-Type:application/json');
            echo '{"message":"Successfully Added"}';
        }
    }
    else if ($cmd==6)
    {   
        $cid=$_REQUEST['id'];
        $result=$obj->getPool($cid);
        $num=$obj->fetch();
        $pool = new users();
        $result=$pool->getPool($cid);
        if ($num==null)
        {
            header('Content-Type:application/json');
            echo '{"result":0,"message":"No One Is In Your Pool Yet"}';
        }
        else
        {
            header('Content-Type:application/json');
            $array=array(); 
            while($one=$pool->fetch())
            { 
                $array[]=$one;  
            }
            echo json_encode($array);
        }
    }
    else if ($cmd==7)
    {   
        $cid=$_REQUEST['id'];
        $lat=$_REQUEST['lat'];
        $long=$_REQUEST['long'];
        $result=$obj->updateLocation($cid,$lat,$long);
        if ($result==0)
        {
            header('Content-Type:application/json');
            echo '{"result":0}';
        }
        else
        {
            header('Content-Type:application/json');
            echo '{"message":"Location Recieved"}';
        }
    }
    else if($cmd=8)
    {
        $cid=$_REQUEST['uid'];
        $message=$_REQUEST['message'];
        $pic=$_REQUEST['pic'];
        $result=$obj->updateLocation($message,$cid,$pic);
        if ($result==0)
        {
            header('Content-Type:application/json');
            echo '{"message":"Unable to Add News"}';
        }
        else
        {
            header('Content-Type:application/json');
            echo '{"message":"Added"}';
        }
    }
}

?>