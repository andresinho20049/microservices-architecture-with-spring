package com.andresinho20049.spring_graphql.util;

import java.util.Objects;

import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.DatabaseClient.GenericExecuteSpec;
import org.springframework.stereotype.Component;

//public class GenericExecuteSpecCustom implements GenericExecuteSpec {

@Component
public class DatabaseClientCustom {
	
	private DatabaseClient databaseClient; 
	
	public DatabaseClientCustom(DatabaseClient databaseClient) {
		this.databaseClient = databaseClient;
	}
	
	public GenericExecuteSpecCustom sql(String sql) {
		return new GenericExecuteSpecCustom(this.databaseClient.sql(sql));
	}
	
	public class GenericExecuteSpecCustom {
		
		private GenericExecuteSpec genericExecuteSpec;
		
		public GenericExecuteSpecCustom(GenericExecuteSpec genericExecuteSpec) {
			this.genericExecuteSpec = genericExecuteSpec;
		}
		
		public GenericExecuteSpecCustom bindOptional(String name, Object value, Class<?> type) {
			if(Objects.isNull(value)) {
				this.genericExecuteSpec = this.genericExecuteSpec.bindNull(name, type);
				return this;
			} 
			
			this.genericExecuteSpec = this.genericExecuteSpec.bind(name, value);
			return this;
		}
		
		public GenericExecuteSpec build() {
			return this.genericExecuteSpec;
		}
		
	}
	

}
