<template>
  <div class="panel panel-primary">
    <div class="panel-heading">
      <h3 class="panel-title">Profile</h3>
    </div>
    <div class="panel-body">
      <form role="form" class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">First Name</label>
          <div class="col-sm-10">
            <input type="text" placeholder="first name" class="form-control" value.bind="user.firstName">
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label">Last Name</label>
          <div class="col-sm-10">
            <input type="text" placeholder="last name" class="form-control" value.bind="user.lastName">
          </div>
        </div>

        <div class="form-group">
          <label class="col-sm-2 control-label">Email</label>
          <div class="col-sm-10">
            <input type="text" placeholder="email" class="form-control" value.bind="user.email">
          </div>
        </div>

     
      </form>
    </div>
  </div>

  <div class="button-bar">
    <button class="btn btn-success" click.delegate="save()" disabled.bind="!canSave">Save</button>
  </div>
</template>
