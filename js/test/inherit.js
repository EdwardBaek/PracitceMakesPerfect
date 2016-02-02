function Money(currency, amount)
{			
	if( (currency && currency.constructor !== String) || (amount && amount.constructor !== Number) )
	{
		console.error("Money:Bad request", "Type Not Matched");
		return null;
	}
		
	this._currency = currency;
	this._amount = amount;

	Money.prototype.setCurrency = function( currency ){
		if( currency && currency.constructor !== String ){
			console.error( '' );
			return;
		}
		this._currency = currency; 
	};


	Money.prototype.getCurrency = function(){
			return this._currency; 
	}

	Money.prototype.setAmount = function( amount ){
		this._amount = amount;
	}

	Money.prototype.getAmount = function(){ 
			return this._amount; 
	}
}