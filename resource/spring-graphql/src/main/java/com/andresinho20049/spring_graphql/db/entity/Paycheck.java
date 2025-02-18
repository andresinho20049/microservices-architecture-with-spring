package com.andresinho20049.spring_graphql.db.entity;

import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "paycheck")
public class Paycheck {

    @Id
    private Long id;

    @CreatedDate
    private LocalDate createdAt;

    @LastModifiedDate
    private LocalDate updatedAt;

    @LastModifiedBy
    private String updatedUsername;

    private Long employeeId;

    private LocalDate payDate;

    private Double grossEarn;

    private Double deduction;

    private Double netPay;

    private Long companyId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDate getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDate updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getUpdatedUsername() {
		return updatedUsername;
	}

	public void setUpdatedUsername(String updatedUsername) {
		this.updatedUsername = updatedUsername;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public LocalDate getPayDate() {
		return payDate;
	}

	public void setPayDate(LocalDate payDate) {
		this.payDate = payDate;
	}

	public Double getGrossEarn() {
		return grossEarn;
	}

	public void setGrossEarn(Double grossEarn) {
		this.grossEarn = grossEarn;
	}

	public Double getDeduction() {
		return deduction;
	}

	public void setDeduction(Double deduction) {
		this.deduction = deduction;
	}

	public Double getNetPay() {
		return netPay;
	}

	public void setNetPay(Double netPay) {
		this.netPay = netPay;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(companyId, createdAt, deduction, employeeId, grossEarn, id, netPay, payDate, updatedAt,
				updatedUsername);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Paycheck other = (Paycheck) obj;
		return Objects.equals(companyId, other.companyId) && Objects.equals(createdAt, other.createdAt)
				&& Objects.equals(deduction, other.deduction) && Objects.equals(employeeId, other.employeeId)
				&& Objects.equals(grossEarn, other.grossEarn) && Objects.equals(id, other.id)
				&& Objects.equals(netPay, other.netPay) && Objects.equals(payDate, other.payDate)
				&& Objects.equals(updatedAt, other.updatedAt) && Objects.equals(updatedUsername, other.updatedUsername);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Paycheck [");
		if (id != null) {
			builder.append("id=");
			builder.append(id);
			builder.append(", ");
		}
		if (createdAt != null) {
			builder.append("createdAt=");
			builder.append(createdAt);
			builder.append(", ");
		}
		if (updatedAt != null) {
			builder.append("updatedAt=");
			builder.append(updatedAt);
			builder.append(", ");
		}
		if (updatedUsername != null) {
			builder.append("updatedUsername=");
			builder.append(updatedUsername);
			builder.append(", ");
		}
		if (employeeId != null) {
			builder.append("employeeId=");
			builder.append(employeeId);
			builder.append(", ");
		}
		if (payDate != null) {
			builder.append("payDate=");
			builder.append(payDate);
			builder.append(", ");
		}
		if (grossEarn != null) {
			builder.append("grossEarn=");
			builder.append(grossEarn);
			builder.append(", ");
		}
		if (deduction != null) {
			builder.append("deduction=");
			builder.append(deduction);
			builder.append(", ");
		}
		if (netPay != null) {
			builder.append("netPay=");
			builder.append(netPay);
			builder.append(", ");
		}
		if (companyId != null) {
			builder.append("companyId=");
			builder.append(companyId);
		}
		builder.append("]");
		return builder.toString();
	}
    
}