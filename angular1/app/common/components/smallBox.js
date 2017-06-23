angular.module('primeiraApp').component('smallBox', {
    bindings: {
        grid: '@',
        colorClass: '@',
        value: '@',
        description: '@',
        iconClass: '@'
    },
    controller: [
      'gridSystem',
        function(gridSystem){
            this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
        }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
        <div class="small-box {{ $ctrl.colorClass }}">
            <div class="inner">
                <h3>{{ $ctrl.value }}</h3>
                <p>{{ $ctrl.description }}</p>
            </div>
            <div class="icon">
                <i class="{{ $ctrl.iconClass}}"></i>
            </div>
        </div>
    </div>`
});
