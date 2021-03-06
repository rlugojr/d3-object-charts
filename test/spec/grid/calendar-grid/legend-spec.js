describe('CalendarGridChart legend', () => {

  var chart, data;

  beforeEach((done) => {
    data = global.initData();
    chart = global.initCalendarGrid(chart, data.raw, done);
  });

  it('should be created', () => {
    let colorLegend = d3.select('.color-legend');
    expect(colorLegend).not.toBeNull();
  });

  it('should have specified gradient colors', () => {
    d3.select('.color-legend').select('defs').select('#gradient').selectAll('stop').each(function(d, i) {
      if (d3.select(this).attr('stop-offset') === '0%') {
        expect(d3.select(this).attr('color')).toBe(chart.color_min);
      } else if (d3.select(this).attr('stop-offset') === '100%') {
        expect(d3.select(this).attr('color')).toBe(chart.color_max);
      }
    });
  });

  it('should have specified arguments shown as description', () => {

    let minValue = Math.round(d3.min(data.raw.map((item) => {
      return item.value;
    }))).toString();
    let maxValue = Math.round(d3.max(data.raw.map((item) => {
      return item.value;
    }))).toString();

    d3.select('.legend').selectAll('.legend-description').each(function(d, i) {
      if (d3.select(this).attr('x') === '0') {
        var text = d3.select(this).text();
        expect(text).toBe(minValue);
      } else {
        var text = d3.select(this).text();
        expect(text).toBe(maxValue);
      }
    });
  });


});
