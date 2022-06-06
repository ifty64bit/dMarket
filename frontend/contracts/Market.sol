pragma solidity >=0.8.1;

contract Test{
    struct Unit{
        uint256 orderID;
        address seller;
        address buyer;
        uint256 value;
        uint time;
        bool recieved;
    }

    mapping(uint256=>Unit) products;

    function addUnit(uint256 _orderID,address _seller) payable public{
        require(products[_orderID].orderID==0, "This order is alreday placed");
        products[_orderID]=Unit(_orderID,_seller,msg.sender,msg.value,block.timestamp,false);
    }

    function refund(uint256 _id) public{
        require(msg.sender==products[_id].buyer, "This producct is not brought by you");
        require(block.timestamp>products[_id].time+10, "You have to wait before refund");
        require(products[_id].recieved==true, "You have Recieved the Product");
        payable(msg.sender).transfer(products[_id].value);
    }

    function deliveryConfirm(uint _id) public {
        require(msg.sender==products[_id].buyer, "Only Buyer can confirm the delivery");
        require(products[_id].recieved==false, "You have already Recieved the Product");
        products[_id].recieved=true;
        payable(products[_id].seller).transfer(products[_id].value);
    }
}