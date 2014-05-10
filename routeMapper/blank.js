		this.map.marker = L.marker(this.map.lat, this.map.lng, {
			title: this.data.address,
			clickable: true,
			icon: L.icon({
				iconUrl: this.getIconUrl()
			})
		}).addTo(this.map.map);